"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, UserX, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [reset, setReset] = useState(false);

  const handleResetAllSubscriptions = () => {
    localStorage.removeItem("escky_subscription");
    localStorage.setItem("admin_reset_subscriptions", Date.now().toString());
    setReset(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto pt-20">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>

        <Card className="border-red-500/20 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserX className="w-6 h-6 text-red-400" />
              <CardTitle className="text-white">Reset All Premium Memberships</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Downgrade all premium members to regular members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!reset ? (
              <>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200">
                    <p className="font-semibold mb-1">Warning: This action will:</p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-200/80">
                      <li>Clear your current subscription status</li>
                      <li>Set a flag that clears all users' subscriptions when they visit</li>
                      <li>Reset localStorage subscription data</li>
                    </ul>
                    <p className="mt-2">
                      Note: This only affects client-side data. For Stripe subscriptions, 
                      cancel them separately via Stripe Dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/50">
                  <input
                    type="checkbox"
                    id="confirm"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="confirm" className="text-sm text-slate-300">
                    I understand this will reset all premium memberships
                  </label>
                </div>

                <Button
                  onClick={handleResetAllSubscriptions}
                  disabled={!confirmed}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Reset All Subscriptions
                </Button>
              </>
            ) : (
              <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <UserX className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Subscriptions Reset</h3>
                <p className="text-slate-400 text-sm">
                  All users will be downgraded to regular members when they next visit the site.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 p-4 rounded-lg bg-slate-800/50 backdrop-blur border border-slate-700">
          <h3 className="text-sm font-semibold text-white mb-2">Additional Actions</h3>
          <p className="text-xs text-slate-400 mb-3">
            For complete subscription cancellation, also:
          </p>
          <ul className="text-xs text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-slate-500">1.</span>
              <span>Log in to <a href="https://dashboard.stripe.com/test/subscriptions" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Stripe Dashboard</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500">2.</span>
              <span>Cancel active subscriptions manually</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-500">3.</span>
              <span>This prevents future charges</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
