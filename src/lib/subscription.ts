import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export type SubscriptionData = {
  user_email: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  payment_confirmed: boolean;
};

export async function getSubscriptionByEmail(email: string) {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

export async function createOrUpdateSubscription(subscriptionData: SubscriptionData) {
  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(
      {
        ...subscriptionData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_email" }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function isPremiumUser(email: string): Promise<boolean> {
  const subscription = await getSubscriptionByEmail(email);
  
  if (!subscription) {
    return false;
  }

  const now = new Date();
  const periodEnd = new Date(subscription.current_period_end);
  
  return (
    subscription.payment_confirmed === true &&
    subscription.status === "active" &&
    periodEnd > now &&
    !subscription.cancel_at_period_end
  );
}
