import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, amount, planId } = await req.json();

    if (!phoneNumber || !amount || !planId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formattedPhone = phoneNumber.replace(/\s+/g, "").replace(/^0/, "+254");
    
    if (!/^\+254[17]\d{8}$/.test(formattedPhone)) {
      return NextResponse.json(
        { error: "Invalid Kenyan phone number format" },
        { status: 400 }
      );
    }

    const kesAmount = Math.round(amount * 130);
    
    const transactionRef = `MPESA-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const { data: payment, error: dbError } = await supabase
      .from("mobile_payments")
      .insert({
        transaction_ref: transactionRef,
        phone_number: formattedPhone,
        amount_usd: amount,
        amount_local: kesAmount,
        currency: "KES",
        payment_method: "mpesa",
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
      message: "M-Pesa payment request initiated. Please check your phone.",
      amount: kesAmount,
      currency: "KES",
    });
  } catch (error) {
    console.error("M-Pesa payment error:", error);
    return NextResponse.json(
      { error: "Failed to initiate M-Pesa payment" },
      { status: 500 }
    );
  }
}
