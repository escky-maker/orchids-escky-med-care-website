"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Calendar, CreditCard, AlertCircle, Check, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

function AccountPage() {
  const { subscription, isPremium, isLoading, setSubscription } = useSubscription();
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCancelSubscription = async () => {
    if (!subscription.subscriptionId) return;

    setActionLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscription-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: subscription.subscriptionId,
          action: "cancel",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setSubscription({
        status: data.cancelAtPeriodEnd ? "canceled" : "active",
        currentPeriodEnd: data.currentPeriodEnd,
      });
      setMessage({ type: "success", text: "Subscription will be canceled at the end of the billing period." });
    } catch {
      setMessage({ type: "error", text: "Failed to cancel subscription. Please try again." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReactivate = async () => {
    if (!subscription.subscriptionId) return;

    setActionLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscription-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: subscription.subscriptionId,
          action: "reactivate",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setSubscription({ status: "active" });
      setMessage({ type: "success", text: "Subscription reactivated successfully!" });
    } catch {
      setMessage({ type: "error", text: "Failed to reactivate subscription. Please try again." });
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Account & Subscription</h1>

          {!isPremium && subscription.status === "none" ? (
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle>No Active Subscription</CardTitle>
                <CardDescription>Upgrade to premium to unlock all features</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                    View Pricing Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="border-2 border-rose-200 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Crown className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Premium Member</h2>
                      <p className="text-white/80 text-sm capitalize">
                        {subscription.plan || "Monthly"} Plan
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-green-600" />
                      Status
                    </div>
                    <span className={`font-medium capitalize ${subscription.status === "active" ? "text-green-600" : "text-amber-600"}`}>
                      {subscription.status === "canceled" ? "Canceling" : subscription.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5" />
                      {subscription.status === "canceled" ? "Ends on" : "Renews on"}
                    </div>
                    <span className="font-medium">{formatDate(subscription.currentPeriodEnd)}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <CreditCard className="w-5 h-5" />
                      Plan
                    </div>
                    <span className="font-medium capitalize">{subscription.plan || "Monthly"}</span>
                  </div>

                  {message && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                      message.type === "success" 
                        ? "bg-green-50 border border-green-200 text-green-700" 
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}>
                      {message.type === "success" ? (
                        <Check className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      )}
                      {message.text}
                    </div>
                  )}

                  <div className="pt-4">
                    {subscription.status === "canceled" ? (
                      <Button
                        onClick={handleReactivate}
                        disabled={actionLoading}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                      >
                        {actionLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Reactivate Subscription"
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleCancelSubscription}
                        disabled={actionLoading}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      >
                        {actionLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Cancel Subscription"
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Premium Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "AI Health Consultation Chatbot",
                      "Advanced Health Tracking Tools",
                      "Expert-Curated Resource Library",
                      "Priority Support",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function AccountPageWrapper() {
  return (
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  );
}
