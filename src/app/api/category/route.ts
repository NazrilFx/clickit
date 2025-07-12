import { NextResponse } from "next/server";
import Category from "@/models/Category";
import connectDB from "@/lib/connectDB";

export async function GET() {
  await connectDB();

  try {
    const categories = await Category.find({})

    return NextResponse.json({ categories });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ category: null, error: errorMessage }, { status: 401 });
  }
}
