// Stripe payment service - handles Checkout Session creation and redirect

interface CheckoutResponse {
  url: string;
  sessionId: string;
}

interface SessionResponse {
  customerId: string;
  subscriptionId: string;
  status: string;
  currentPeriodEnd: number;
  plan: string;
  amount: number;
  currency: string;
  customerEmail: string;
  paymentStatus: string;
}

/**
 * Create a Stripe Checkout Session and redirect to Stripe payment page
 */
export async function createCheckoutSession(plan: "monthly" | "yearly"): Promise<void> {
  const resp = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to create checkout session");
  }

  const data: CheckoutResponse = await resp.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error("No checkout URL returned");
  }
}

/**
 * Retrieve checkout session details after payment redirect
 */
export async function getCheckoutSession(sessionId: string): Promise<SessionResponse> {
  const resp = await fetch(`/api/stripe/session?session_id=${sessionId}`);
  if (!resp.ok) {
    throw new Error("Failed to retrieve session");
  }
  return resp.json();
}

/**
 * Open Stripe Customer Portal for subscription management
 */
export async function openCustomerPortal(customerId: string): Promise<void> {
  const resp = await fetch("/api/stripe/portal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId }),
  });

  if (!resp.ok) {
    throw new Error("Failed to open portal");
  }

  const data = await resp.json();
  if (data.url) {
    window.location.href = data.url;
  }
}

/**
 * Save subscription data to localStorage
 */
export function saveSubscription(data: SessionResponse): void {
  localStorage.setItem(
    "toolbox_subscription",
    JSON.stringify({
      customerId: data.customerId,
      subscriptionId: data.subscriptionId,
      status: data.status,
      plan: data.plan,
      currentPeriodEnd: data.currentPeriodEnd,
      amount: data.amount,
      currency: data.currency,
      email: data.customerEmail,
      activatedAt: Date.now(),
    })
  );
}

/**
 * Get stored subscription data
 */
export function getSubscription(): {
  customerId: string;
  subscriptionId: string;
  status: string;
  plan: string;
  currentPeriodEnd: number;
  amount: number;
  currency: string;
  email: string;
  activatedAt: number;
} | null {
  try {
    return JSON.parse(localStorage.getItem("toolbox_subscription") || "null");
  } catch {
    return null;
  }
}

/**
 * Check if subscription is active and not expired
 */
export function isSubscriptionActive(): boolean {
  const sub = getSubscription();
  if (!sub) return false;
  if (sub.status !== "active") return false;
  if (sub.currentPeriodEnd && sub.currentPeriodEnd * 1000 < Date.now()) return false;
  return true;
}

/**
 * Clear subscription data
 */
export function clearSubscription(): void {
  localStorage.removeItem("toolbox_subscription");
}
