import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly Premium",
    price: 2500,
    interval: "month" as const,
    description: "Full access to all premium features",
  },
  annual: {
    id: "annual",
    name: "Annual Premium",
    price: 28500,
    interval: "year" as const,
    description: "Full access to all premium features - Save 5%!",
    originalPrice: 30000,
  },
} as const;

export type PlanId = keyof typeof PLANS;