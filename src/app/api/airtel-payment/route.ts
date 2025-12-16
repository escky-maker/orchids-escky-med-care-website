import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EXCHANGE_RATES: Record<string, number> = {
  "+254": 130,  // Kenya (KES)
  "+255": 2500, // Tanzania (TZS)
  "+256": 3700, // Uganda (UGX)
  "+260": 25,   // Zambia (ZMW)
  "+265": 1700, // Malawi (MWK)
  "+234": 1600, // Nigeria (NGN)
};

const CURRENCIES: Record<string, string> = {
  "+254": "KES",
  "+255": "TZS",
  "+256": "UGX",
  "+260": "ZMW",
  "+265": "MWK",
  "+234": "NGN",
};

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, amount, planId } = await req.json();

    if (!phoneNumber || !amount || !planId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedPhone = phoneNumber.replace(/\s+/g, "");
    
    const countryCode = Object.keys(EXCHANGE_RATES).find(code => 
      formattedPhone.startsWith(code)
    );

    if (!countryCode) {
      return NextResponse.json(
        { error: "Unsupported country code for Airtel Money" },
        { status: 400 }
      );
    }

    const exchangeRate = EXCHANGE_RATES[countryCode];
    const currency = CURRENCIES[countryCode];
    const localAmount = Math.round(amount * exchangeRate);
    
    const transactionRef = `AIRTEL-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const { data: payment, error: dbError } = await supabase
      .from("mobile_payments")
      .insert({
        transaction_ref: transactionRef,
        phone_number: formattedPhone,
        amount_usd: amount,
        amount_local: localAmount,
        currency: currency,
        payment_method: "airtel_money",
        plan_id: planId,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return NextResponse.json({
      success: true,
      transactionRef,
      message: "Airtel Money payment request initiated. Please check your phone.",
      amount: localAmount,
      currency,
    });
  } catch (error) {
    console.error("Airtel Money payment error:", error);
    return NextResponse.json(
      { error: "Failed to initiate Airtel Money payment" },
      { status: 500 }
    );
  }
}
