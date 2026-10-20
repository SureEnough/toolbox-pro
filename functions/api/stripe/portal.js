// Stripe Customer Portal API
// POST /api/stripe/portal
// Body: { customerId: "xxx" }
// Returns Stripe Customer Portal URL for subscription management

const STRIPE_API = "https://api.stripe.com/v1";

export async function onRequestPost({ request, env }) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return json({ error: "Missing customerId" }, 400);
    }

    const secretKey = env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return json({ error: "Stripe not configured" }, 500);
    }

    const origin = request.headers.get("Origin") || "https://toolbox-pro-4lq.pages.dev";

    const params = new URLSearchParams();
    params.append("customer", customerId);
    params.append("return_url", `${origin}/settings`);

    const resp = await fetch(`${STRIPE_API}/billing_portal/sessions`, {
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

    return json({ url: data.url });
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
