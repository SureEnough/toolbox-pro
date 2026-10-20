// Stripe Checkout Session retrieval API
// GET /api/stripe/session?session_id=xxx
// Used by success page to verify payment and get subscription details

const STRIPE_API = "https://api.stripe.com/v1";

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId) {
      return json({ error: "Missing session_id" }, 400);
    }

    const secretKey = env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return json({ error: "Stripe not configured" }, 500);
    }

    // Retrieve session with subscription expanded
    const resp = await fetch(
      `${STRIPE_API}/checkout/sessions/${sessionId}?expand[]=subscription`,
      {
        headers: { "Authorization": `Bearer ${secretKey}` },
      }
    );

    const data = await resp.json();
    if (!resp.ok) {
      return json({ error: data.error?.message || "Stripe error" }, 400);
    }

    return json({
      customerId: data.customer,
      subscriptionId: data.subscription?.id,
      status: data.subscription?.status,
      currentPeriodEnd: data.subscription?.current_period_end,
      plan: data.subscription?.plan?.interval,
      amount: data.subscription?.plan?.amount,
      currency: data.subscription?.plan?.currency,
      customerEmail: data.customer_details?.email,
      paymentStatus: data.payment_status,
    });
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
