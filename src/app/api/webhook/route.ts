import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createOrUpdateSubscription } from "@/lib/subscription";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          
          const customerEmail = typeof customer !== "string" && !customer.deleted 
            ? customer.email 
            : null;

          if (customerEmail) {
            await createOrUpdateSubscription({
              user_email: customerEmail,
              stripe_customer_id: subscription.customer as string,
              stripe_subscription_id: subscription.id,
              plan_id: subscription.metadata.plan || "monthly",
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              payment_confirmed: true,
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        const customerEmail = typeof customer !== "string" && !customer.deleted 
          ? customer.email 
          : null;

        if (customerEmail) {
          await createOrUpdateSubscription({
            user_email: customerEmail,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            plan_id: subscription.metadata.plan || "monthly",
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            payment_confirmed: subscription.status === "active",
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        const customerEmail = typeof customer !== "string" && !customer.deleted 
          ? customer.email 
          : null;

        if (customerEmail) {
          await createOrUpdateSubscription({
            user_email: customerEmail,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            plan_id: subscription.metadata.plan || "monthly",
            status: "canceled",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: true,
            payment_confirmed: false,
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
