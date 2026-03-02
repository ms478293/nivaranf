import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN!;
const SQUARE_API_URL = "https://connect.squareup.com/v2";
const LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sourceId, amount, email, name, note } = body;

    if (!sourceId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: sourceId, amount" },
        { status: 400 }
      );
    }

    const amountCents = Math.round(Number(amount) * 100);
    if (amountCents < 100) {
      return NextResponse.json(
        { error: "Minimum donation is $1.00" },
        { status: 400 }
      );
    }

    // Create the payment via Square Payments API
    const idempotencyKey = crypto.randomUUID();

    const paymentBody: Record<string, any> = {
      idempotency_key: idempotencyKey,
      source_id: sourceId,
      amount_money: {
        amount: amountCents,
        currency: "USD",
      },
      location_id: LOCATION_ID,
      note: note || `Donation to Nivaran Foundation${name ? ` from ${name}` : ""}`,
      statement_description_identifier: "NIVARAN DONATION",
    };

    // Add buyer email if provided (for receipt)
    if (email) {
      paymentBody.buyer_email_address = email;
    }

    const response = await fetch(`${SQUARE_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-12-18",
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Square payment error:", JSON.stringify(data, null, 2));
      const errorMessage =
        data.errors?.[0]?.detail || "Payment failed. Please try again.";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: data.payment.id,
        status: data.payment.status,
        amount: data.payment.amount_money.amount / 100,
        receiptUrl: data.payment.receipt_url,
      },
    });
  } catch (error: any) {
    console.error("Square payment route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
