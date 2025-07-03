import { NextResponse } from "next/server";
import Link from "@/models/Link";
import connectDB from "@/lib/connectDB";

export async function GET() {
  await connectDB();

  try {
    const links = await Link.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ links });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ link: null, error: errorMessage }, { status: 401 });
  }
}
