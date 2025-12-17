"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SubscriptionStatus = "none" | "active" | "canceled" | "past_due";

type SubscriptionData = {
  status: SubscriptionStatus;
  plan: string | null;
  currentPeriodEnd: number | null;
  subscriptionId: string | null;
  customerId: string | null;
};

type SubscriptionContextType = {
  subscription: SubscriptionData;
  isPremium: boolean;
  isLoading: boolean;
  refreshSubscription: () => Promise<void>;
  setSubscription: (data: Partial<SubscriptionData>) => void;
};

const defaultSubscription: SubscriptionData = {
  status: "none",
  plan: null,
  currentPeriodEnd: null,
  subscriptionId: null,
  customerId: null,
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscriptionState] = useState<SubscriptionData>(defaultSubscription);
  const [isLoading, setIsLoading] = useState(true);

  const isPremium = subscription.status === "active";

  const refreshSubscription = async () => {
    try {
      const resetFlag = localStorage.getItem("admin_reset_subscriptions");
      if (resetFlag) {
        localStorage.removeItem("escky_subscription");
        localStorage.removeItem("escky_user_email");
        setSubscriptionState(defaultSubscription);
        setIsLoading(false);
        return;
      }

      const userEmail = localStorage.getItem("escky_user_email");
      if (!userEmail) {
        setSubscriptionState(defaultSubscription);
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/subscription?email=${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setSubscriptionState(data);
        localStorage.setItem("escky_subscription", JSON.stringify(data));
      } else {
        setSubscriptionState(defaultSubscription);
      }
    } catch {
      const stored = localStorage.getItem("escky_subscription");
      if (stored) {
        const data = JSON.parse(stored);
        setSubscriptionState(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setSubscription = (data: Partial<SubscriptionData>) => {
    const newData = { ...subscription, ...data };
    setSubscriptionState(newData);
    localStorage.setItem("escky_subscription", JSON.stringify(newData));
  };

  useEffect(() => {
    refreshSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{ subscription, isPremium, isLoading, refreshSubscription, setSubscription }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
}
