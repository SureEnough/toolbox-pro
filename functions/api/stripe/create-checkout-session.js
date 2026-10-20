// Stripe Checkout Session creation API
// POST /api/stripe/create-checkout-session
// Body: { plan: "monthly" | "yearly" }

const STRIPE_API = "https://api.stripe.com/v1";

export async function onRequestPost({ request, env }) {
  try {
    const { plan } = await request.json();
    if (!plan || !["monthly", "yearly"].includes(plan)) {
      return json({ error: "Invalid plan" }, 400);
    }

    const secretKey = env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return json({ error: "Stripe not configured" }, 500);
    }

    const origin = request.headers.get("Origin") || "https://toolbox-pro-4lq.pages.dev";

    // Price IDs from Stripe Dashboard (configured via env)
    const priceKey = plan === "monthly" ? "STRIPE_PRICE_MONTHLY" : "STRIPE_PRICE_YEARLY";
    const priceId = env[priceKey];
    if (!priceId) {
      return json({ error: `Price ID not configured: ${priceKey}` }, 500);
    }

    // Create Checkout Session
    const params = new URLSearchParams();
    params.append("mode", "subscription");
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/payment/cancel`);
    params.append("allow_promotion_codes", "true");
    params.append("billing_address_collection", "auto");
    params.append("customer_creation", "always");

    const resp = await fetch(`${STRIPE_API}/checkout/sessions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return json({ error: data.error?.message || "Stripe error" }, 400);
    }

    return json({ url: data.url, sessionId: data.id });
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
