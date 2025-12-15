import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { planId, email } = await req.json();

    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const plan = PLANS[planId as PlanId];

    const customer = await stripe.customers.create({
      email: email || undefined,
      metadata: { plan: planId },
    });

    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: "usd",
      recurring: {
        interval: plan.interval,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = subscription.latest_invoice as { payment_intent: { client_secret: string } };
    
    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: invoice.payment_intent.client_secret,
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Create subscription error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create subscription", details: message },
      { status: 500 }
    );
  }
}