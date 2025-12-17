import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export const PLANS = {
  christmas: {
    id: "christmas",
    name: "Christmas Special",
    price: 499,
    interval: "month" as const,
    description: "Limited December offer - Reverts to $7.99/mo after",
    originalPrice: 799,
  },
  monthly: {
    id: "monthly",
    name: "Monthly Premium",
    price: 799,
    interval: "month" as const,
    description: "Full access to all premium features",
  },
  annual: {
    id: "annual",
    name: "Annual Premium",
    price: 9108,
    interval: "year" as const,
    description: "Full access to all premium features - Save 5%!",
    originalPrice: 9588,
  },
} as const;

export type PlanId = keyof typeof PLANS;