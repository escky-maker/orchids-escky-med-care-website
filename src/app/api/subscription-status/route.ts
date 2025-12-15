import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get("subscriptionId");

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID required" }, { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return NextResponse.json({
      status: subscription.status,
      plan: subscription.metadata?.plan || null,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error("Subscription status error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, action } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID required" }, { status: 400 });
    }

    if (action === "cancel") {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return NextResponse.json({
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currentPeriodEnd: subscription.current_period_end,
      });
    }

    if (action === "reactivate") {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });

      return NextResponse.json({
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Subscription action error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
