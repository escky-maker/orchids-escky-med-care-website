"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Check, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly Premium",
    price: 25,
    interval: "month",
    description: "Billed monthly",
  },
  annual: {
    id: "annual",
    name: "Annual Premium",
    price: 285,
    interval: "year",
    description: "Billed yearly - Save 5%",
    originalPrice: 300,
  },
} as const;

function CheckoutForm({ 
  clientSecret, 
  subscriptionId, 
  customerId,
  planId 
}: { 
  clientSecret: string; 
  subscriptionId: string;
  customerId: string;
  planId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { setSubscription } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/checkout/success",
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setSubscription({
        status: "active",
        plan: planId,
        subscriptionId,
        customerId,
        currentPeriodEnd: Math.floor(Date.now() / 1000) + (planId === "annual" ? 31536000 : 2592000),
      });
      setSuccess(true);
    }

    setIsProcessing(false);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Premium!</h2>
        <p className="text-slate-600 mb-6">
          Your subscription is now active. Enjoy all premium features including the AI Health Chatbot.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
              Start Using Premium
            </Button>
          </Link>
          <Link href="/account">
            <Button size="lg" variant="outline">
              View Subscription
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <PaymentElement 
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Subscribe Now
          </>
        )}
      </Button>

      <p className="text-xs text-center text-slate-500">
        Your subscription will renew automatically. Cancel anytime.
      </p>
    </form>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "payment">("email");

  const planId = searchParams.get("plan") || "monthly";
  const plan = PLANS[planId as keyof typeof PLANS] || PLANS.monthly;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create subscription");
      }

      setClientSecret(data.clientSecret);
      setSubscriptionId(data.subscriptionId);
      setCustomerId(data.customerId);
      setStep("payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to pricing
        </Link>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-2 border-rose-200 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{plan.name}</p>
                      <p className="text-sm text-slate-500">{plan.description}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    {"originalPrice" in plan && (
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Regular price</span>
                        <span className="line-through">${plan.originalPrice}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg mt-1">
                      <span>Total</span>
                      <span>${plan.price}/{plan.interval === "year" ? "yr" : "mo"}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-xs font-medium text-slate-700">Premium includes:</p>
                    {["AI Health Chatbot", "Advanced Tools", "Priority Support"].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3 h-3 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Shield className="w-4 h-4" />
                Secure payment with Stripe
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-2 border-slate-200">
                <CardHeader>
                  <CardTitle>
                    {step === "email" ? "Enter your email" : "Payment details"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {step === "email" ? (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="mt-1"
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Setting up...
                          </>
                        ) : (
                          "Continue to payment"
                        )}
                      </Button>
                    </form>
                  ) : clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#f43f5e",
                            borderRadius: "8px",
                          },
                        },
                      }}
                    >
                      <CheckoutForm
                        clientSecret={clientSecret}
                        subscriptionId={subscriptionId!}
                        customerId={customerId!}
                        planId={planId}
                      />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
