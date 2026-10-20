// Stripe Webhook handler
// POST /api/webhook/stripe
// Verifies Stripe signature and processes subscription events

const STRIPE_API = "https://api.stripe.com/v1";

export async function onRequestPost({ request, env }) {
  try {
    const secretKey = env.STRIPE_SECRET_KEY;
    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
    if (!secretKey || !webhookSecret) {
      return json({ error: "Stripe not configured" }, 500);
    }

    const sig = request.headers.get("Stripe-Signature");
    if (!sig) {
      return json({ error: "Missing signature" }, 400);
    }

    const rawBody = await request.text();

    // Verify webhook signature via Stripe API
    // (Cloudflare Workers can't use stripe SDK, so we verify manually)
    const event = await verifyAndConstructEvent(rawBody, sig, webhookSecret, secretKey);
    if (!event) {
      return json({ error: "Invalid signature" }, 400);
    }

    // Process event
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object, env);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object, env);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object, env);
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object, env);
        break;

      default:
        // Unhandled event type
        break;
    }

    return json({ received: true });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

// Verify Stripe webhook signature
// Stripe signs webhooks using HMAC-SHA256
async function verifyAndConstructEvent(payload, sigHeader, secret, stripeKey) {
  const parts = sigHeader.split(",");
  const sigMap = {};
  for (const part of parts) {
    const [k, v] = part.split("=");
    sigMap[k] = v;
  }

  const timestamp = sigMap["t"];
  const signature = sigMap["v1"];
  if (!timestamp || !signature) return null;

  // Check timestamp (tolerate 5 minutes)
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  if (age > 300) return null;

  // Compute HMAC-SHA256
  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expectedSig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload)
  );
  const expectedHex = Array.from(new Uint8Array(expectedSig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (expectedHex !== signature) return null;

  return JSON.parse(payload);
}

// Event handlers
async function handleCheckoutCompleted(session, env) {
  // Log to KV if available
  if (env.TOOLBOX_KV) {
    await env.TOOLBOX_KV.put(
      `subscription:${session.subscription}`,
      JSON.stringify({
        customerId: session.customer,
        subscriptionId: session.subscription,
        status: "active",
        createdAt: Date.now(),
      })
    );
  }
}

async function handleSubscriptionUpdated(subscription, env) {
  if (env.TOOLBOX_KV) {
    await env.TOOLBOX_KV.put(
      `subscription:${subscription.id}`,
      JSON.stringify({
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        updatedAt: Date.now(),
      })
    );
  }
}

async function handleSubscriptionDeleted(subscription, env) {
  if (env.TOOLBOX_KV) {
    await env.TOOLBOX_KV.delete(`subscription:${subscription.id}`);
  }
}

async function handleInvoicePaid(invoice, env) {
  // Renewal payment received
  if (env.TOOLBOX_KV && invoice.subscription) {
    const existing = await env.TOOLBOX_KV.get(`subscription:${invoice.subscription}`);
    const data = existing ? JSON.parse(existing) : {};
    await env.TOOLBOX_KV.put(
      `subscription:${invoice.subscription}`,
      JSON.stringify({
        ...data,
        status: "active",
        currentPeriodEnd: invoice.period_end,
        updatedAt: Date.now(),
      })
    );
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
