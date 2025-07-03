import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { nanoid } from "nanoid";

// Snap API Midtrans instance
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Hitung order_number otomatis
    
    const parameter = {
      transaction_details: {
        order_id: nanoid(12), // order_id harus unik
        gross_amount: body.amount, // total semua item
      },
      customer_details: {
        first_name: "Nazril",
        email: "farnazzchannel@gmail.com",
        phone: "08123456789",
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    return NextResponse.json({ token: transactionToken });
  } catch (err) {
    console.error("Midtrans error:", err);
    return NextResponse.json({ error: "Failed to create transaction", message: err }, { status: 500 });
  }
}
