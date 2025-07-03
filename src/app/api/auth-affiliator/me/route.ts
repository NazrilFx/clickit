import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import Affiliator from "@/models/Affiliator";
import connectDB from "@/lib/connectDB";

export async function GET(req: NextRequest) {
  await connectDB();

  // Ambil token dari cookies
  const token = req.cookies.get("affiliator_token")?.value;
  if (!token) return NextResponse.json({ affiliator: null, message: "token not found" }, { status: 401 });

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded || typeof decoded === "string" || !decoded.id) {
      return NextResponse.json({ affiliator: null }, { status: 401 });
    }

    // Ambil affiliator dari database tanpa password_hash
    const affiliator = await Affiliator.findById(decoded.id).select("-password_hash");

    if (!affiliator) return NextResponse.json({ affiliator: null }, { status: 404 });

    return NextResponse.json({ affiliator });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ affiliator: null, error: errorMessage }, { status: 401 });
  }
}
