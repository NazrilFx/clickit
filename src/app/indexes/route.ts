import { NextResponse } from "next/server";
import LinkVisitorIps from "@/models/LinkVisitorIps";
import GlobalVisitorIps from "@/models/GlobalVisitorIps";
import connectDB from "@/lib/connectDB";

export async function GET() {
  await connectDB();

  try {
    const linkVisitorIps = await LinkVisitorIps.find({}).sort({ createdAt: -1 });
    const globalVisitorIps = await GlobalVisitorIps.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ linkVisitorIps, globalVisitorIps });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ link: null, error: errorMessage }, { status: 401 });
  }
}
