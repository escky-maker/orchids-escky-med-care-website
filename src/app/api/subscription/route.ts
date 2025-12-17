import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionByEmail } from "@/lib/subscription";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const subscription = await getSubscriptionByEmail(email);

    if (!subscription) {
      return NextResponse.json({
        status: "none",
        plan: null,
        currentPeriodEnd: null,
        subscriptionId: null,
        customerId: null,
      });
    }

    const now = new Date();
    const periodEnd = new Date(subscription.current_period_end);
    const isActive = 
      subscription.payment_confirmed &&
      subscription.status === "active" &&
      periodEnd > now;

    return NextResponse.json({
      status: isActive ? "active" : subscription.status,
      plan: subscription.plan_id,
      currentPeriodEnd: Math.floor(periodEnd.getTime() / 1000),
      subscriptionId: subscription.stripe_subscription_id,
      customerId: subscription.stripe_customer_id,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error("Subscription fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
