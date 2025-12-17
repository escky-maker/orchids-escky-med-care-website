"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements, ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Shield, Lock, Check, Loader2, CheckCircle2, AlertCircle, 
  Smartphone, CreditCard, Banknote, Copy, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PLANS = {
  christmas: {
    id: "christmas",
    name: "Christmas Special",
    price: 4.99,
    interval: "month",
    description: "Limited December offer - Reverts to $7.99/mo after",
    originalPrice: 7.99,
  },
  monthly: {
    id: "monthly",
    name: "Monthly Premium",
    price: 7.99,
    interval: "month",
    description: "Billed monthly",
  },
  annual: {
    id: "annual",
    name: "Annual Premium",
    price: 91.08,
    interval: "year",
    description: "Billed yearly - Save 5%",
    originalPrice: 95.88,
  },
} as const;

type PaymentMethod = "card" | "mpesa" | "airtel" | "zelle";

const PAYMENT_METHODS = [
  { 
    id: "card" as const, 
    name: "Card / Apple Pay / PayPal", 
    icon: CreditCard, 
    description: "Credit card, debit card, Apple Pay, Google Pay, PayPal, Venmo",
    color: "from-indigo-500 to-purple-600"
  },
  { 
    id: "mpesa" as const, 
    name: "M-Pesa", 
    icon: Smartphone, 
    description: "Kenya mobile money (Safaricom)",
    color: "from-green-500 to-emerald-600"
  },
  { 
    id: "airtel" as const, 
    name: "Airtel Money", 
    icon: Phone, 
    description: "Airtel mobile money (Africa)",
    color: "from-red-500 to-rose-600"
  },
  { 
    id: "zelle" as const, 
    name: "Zelle", 
    icon: Banknote, 
    description: "US bank transfer",
    color: "from-violet-500 to-purple-600"
  },
];

function StripeCheckoutForm({ 
  clientSecret, 
  subscriptionId, 
  customerId,
  planId,
  email
}: { 
  clientSecret: string; 
  subscriptionId: string;
  customerId: string;
  planId: string;
  email: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { setSubscription } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [expressCheckoutReady, setExpressCheckoutReady] = useState(false);

  const handlePaymentSuccess = (userEmail: string) => {
    localStorage.setItem("escky_user_email", userEmail);
    setSubscription({
      status: "active",
      plan: planId,
      subscriptionId,
      customerId,
      currentPeriodEnd: Math.floor(Date.now() / 1000) + (planId === "annual" ? 31536000 : 2592000),
    });
    setSuccess(true);
  };

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
      handlePaymentSuccess(email);
    }

    setIsProcessing(false);
  };

  const onExpressCheckoutConfirm = async () => {
    if (!stripe || !elements) return;
    
    setIsProcessing(true);
    setError(null);

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
      handlePaymentSuccess(email);
    }

    setIsProcessing(false);
  };

  if (success) {
    return <SuccessMessage />;
  }

  return (
    <div className="space-y-6">
      {expressCheckoutReady && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 text-center">Express checkout</p>
          <ExpressCheckoutElement 
            onConfirm={onExpressCheckoutConfirm}
            onReady={({ availablePaymentMethods }) => {
              if (availablePaymentMethods) {
                setExpressCheckoutReady(true);
              }
            }}
              options={{
                buttonType: {
                  applePay: "subscribe",
                  googlePay: "subscribe",
                  // PayPal does not support "subscribe" button type in Express Checkout.
                  // Allowed values: "paypal", "checkout", "buynow", "pay".
                  paypal: "paypal",
                },
              }}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or pay with card</span>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="max-h-[350px] overflow-y-auto pr-2">
          <PaymentElement 
            onReady={() => setExpressCheckoutReady(true)}
            options={{
              layout: "tabs",
              wallets: {
                applePay: "auto",
                googlePay: "auto",
              },
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
    </div>
  );
}

function MpesaPaymentForm({ plan, onSuccess }: { plan: typeof PLANS.monthly; onSuccess: () => void }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/mpesa-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phoneNumber: phoneNumber.startsWith("+") ? phoneNumber : `+254${phoneNumber.replace(/^0/, "")}`,
          amount: plan.price,
          planId: plan.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate M-Pesa payment");
      }

      setStatus("pending");
      setTimeout(() => {
        setStatus("success");
        onSuccess();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "success") {
    return <SuccessMessage />;
  }

  if (status === "pending") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Check your phone</h3>
        <p className="text-sm text-slate-600 mb-4">
          An M-Pesa payment request has been sent to <strong>{phoneNumber}</strong>
        </p>
        <p className="text-xs text-slate-500">
          Enter your M-Pesa PIN on your phone to complete the payment.
        </p>
        <Loader2 className="w-6 h-6 mx-auto mt-4 animate-spin text-green-600" />
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <p className="font-semibold text-green-800">M-Pesa</p>
            <p className="text-xs text-green-600">Safaricom Kenya</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mpesa-phone">Phone Number</Label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
            +254
          </span>
          <Input
            id="mpesa-phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="712345678"
            className="rounded-l-none"
            maxLength={9}
          />
        </div>
        <p className="text-xs text-slate-500">Enter your Safaricom M-Pesa number</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isProcessing || phoneNumber.length < 9}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending request...
          </>
        ) : (
          <>
            <Smartphone className="w-4 h-4 mr-2" />
            Pay KES {(plan.price * 130).toLocaleString()} with M-Pesa
          </>
        )}
      </Button>

      <p className="text-xs text-center text-slate-500">
        You&apos;ll receive an STK push notification on your phone
      </p>
    </form>
  );
}

function AirtelMoneyForm({ plan, onSuccess }: { plan: typeof PLANS[keyof typeof PLANS]; onSuccess: () => void }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const countryCodes = [
    { code: "+254", country: "Kenya" },
    { code: "+255", country: "Tanzania" },
    { code: "+256", country: "Uganda" },
    { code: "+260", country: "Zambia" },
    { code: "+265", country: "Malawi" },
    { code: "+234", country: "Nigeria" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/airtel-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phoneNumber: `${countryCode}${phoneNumber.replace(/^0/, "")}`,
          amount: plan.price,
          planId: plan.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate Airtel Money payment");
      }

      setStatus("pending");
      setTimeout(() => {
        setStatus("success");
        onSuccess();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "success") {
    return <SuccessMessage />;
  }

  if (status === "pending") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <Phone className="w-8 h-8 text-red-600 animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Check your phone</h3>
        <p className="text-sm text-slate-600 mb-4">
          An Airtel Money payment request has been sent to <strong>{countryCode}{phoneNumber}</strong>
        </p>
        <p className="text-xs text-slate-500">
          Enter your Airtel Money PIN on your phone to complete the payment.
        </p>
        <Loader2 className="w-6 h-6 mx-auto mt-4 animate-spin text-red-600" />
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <p className="font-semibold text-red-800">Airtel Money</p>
            <p className="text-xs text-red-600">Mobile Money Africa</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="airtel-phone">Phone Number</Label>
        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-28 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} {c.country}
              </option>
            ))}
          </select>
          <Input
            id="airtel-phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
            placeholder="712345678"
            className="flex-1"
            maxLength={10}
          />
        </div>
        <p className="text-xs text-slate-500">Enter your Airtel Money number</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isProcessing || phoneNumber.length < 9}
        className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending request...
          </>
        ) : (
          <>
            <Phone className="w-4 h-4 mr-2" />
            Pay ${plan.price} with Airtel Money
          </>
        )}
      </Button>

      <p className="text-xs text-center text-slate-500">
        You&apos;ll receive a payment request on your phone
      </p>
    </form>
  );
}

function ZellePaymentForm({ plan, onSuccess }: { plan: typeof PLANS[keyof typeof PLANS]; onSuccess: () => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const zelleInfo = {
    email: "payments@esckymedcare.com",
    phone: "+1 (555) 123-4567",
    name: "Escky Med Care LLC",
    reference: `ESCKY-${Date.now().toString(36).toUpperCase()}`,
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => onSuccess(), 1500);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-violet-600 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Verifying Payment</h3>
        <p className="text-sm text-slate-600">
          We&apos;re checking for your Zelle payment. This may take a few minutes.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div>
            <p className="font-semibold text-violet-800">Zelle</p>
            <p className="text-xs text-violet-600">US Bank Transfer</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-slate-900">Send ${plan.price} via Zelle to:</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="font-mono text-sm">{zelleInfo.email}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => copyToClipboard(zelleInfo.email, "email")}
            >
              {copied === "email" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div>
              <p className="text-xs text-slate-500">Recipient Name</p>
              <p className="font-mono text-sm">{zelleInfo.name}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => copyToClipboard(zelleInfo.name, "name")}
            >
              {copied === "name" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="text-xs text-yellow-700">Reference (include in memo)</p>
              <p className="font-mono text-sm font-bold">{zelleInfo.reference}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => copyToClipboard(zelleInfo.reference, "reference")}
            >
              {copied === "reference" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-800">
          <strong>Important:</strong> Include the reference code in your Zelle memo to ensure quick processing.
        </p>
      </div>

      <Button
        onClick={handleConfirm}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
        size="lg"
      >
        I&apos;ve sent the payment
      </Button>

      <p className="text-xs text-center text-slate-500">
        Your subscription will be activated once payment is verified (usually within 24 hours)
      </p>
    </div>
  );
}

function SuccessMessage() {
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

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "method" | "payment">("email");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [success, setSuccess] = useState(false);
  const { setSubscription } = useSubscription();

  const planId = searchParams.get("plan") || "monthly";
  const plan = PLANS[planId as keyof typeof PLANS] || PLANS.monthly;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("method");
  };

  const handleMethodSelect = async (method: PaymentMethod) => {
    setSelectedMethod(method);
    
    if (method === "card") {
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    
    setStep("payment");
  };

  const handleAltPaymentSuccess = () => {
    setSubscription({
      status: "active",
      plan: planId,
      subscriptionId: `manual-${Date.now()}`,
      customerId: `manual-${email}`,
      currentPeriodEnd: Math.floor(Date.now() / 1000) + (planId === "annual" ? 31536000 : 2592000),
    });
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-slate-200">
            <CardContent className="pt-6">
              <SuccessMessage />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
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
                Secure payment processing
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600 font-medium mb-2">Payment methods:</p>
                <div className="flex flex-wrap gap-2">
                  {["Visa", "Mastercard", "Apple Pay", "PayPal", "M-Pesa", "Airtel"].map((m) => (
                    <span key={m} className="px-2 py-1 bg-white rounded text-xs border">
                      {m}
                    </span>
                  ))}
                </div>
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
                  <div className="flex items-center gap-2">
                    {step !== "email" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(step === "payment" ? "method" : "email")}
                        className="mr-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    )}
                    <CardTitle>
                      {step === "email" && "Enter your email"}
                      {step === "method" && "Select payment method"}
                      {step === "payment" && `Pay with ${PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}`}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {step === "email" && (
                      <motion.form
                        key="email"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleEmailSubmit}
                        className="space-y-4"
                      >
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

                        <Button
                          type="submit"
                          disabled={!email}
                          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                          size="lg"
                        >
                          Continue
                        </Button>
                      </motion.form>
                    )}

                    {step === "method" && (
                      <motion.div
                        key="method"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-3"
                      >
                        {PAYMENT_METHODS.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => handleMethodSelect(method.id)}
                            disabled={isLoading}
                            className="w-full p-4 rounded-lg border-2 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 transition-all text-left group disabled:opacity-50"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                                <method.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                                  {method.name}
                                </p>
                                <p className="text-sm text-slate-500">{method.description}</p>
                              </div>
                              <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        ))}
                        
                        {isLoading && (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                            <span className="ml-2 text-sm text-slate-600">Setting up payment...</span>
                          </div>
                        )}

                        {error && (
                          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {error}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {step === "payment" && (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {selectedMethod === "card" && clientSecret ? (
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
                            <StripeCheckoutForm
                              clientSecret={clientSecret}
                              subscriptionId={subscriptionId!}
                              customerId={customerId!}
                              planId={planId}
                              email={email}
                            />
                          </Elements>
                        ) : selectedMethod === "card" ? (
                          <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                          </div>
                        ) : selectedMethod === "mpesa" ? (
                          <MpesaPaymentForm plan={plan} onSuccess={handleAltPaymentSuccess} />
                        ) : selectedMethod === "airtel" ? (
                          <AirtelMoneyForm plan={plan} onSuccess={handleAltPaymentSuccess} />
                        ) : selectedMethod === "zelle" ? (
                          <ZellePaymentForm plan={plan} onSuccess={handleAltPaymentSuccess} />
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
