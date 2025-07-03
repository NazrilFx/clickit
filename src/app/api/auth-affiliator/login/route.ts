import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import Affiliator from "@/models/Affiliator";
import connectDB from "@/lib/connectDB";
import getCookieToken from "@/utils/getCookieToken";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Ambil token CSRF dari cookie dan request body
    const csrfTokenFromCookie = getCookieToken(req, "csrf_secret");
    const { email, password, csrfToken } = await req.json(); // Gunakan nama yang lebih standar

    // Perbaiki validasi CSRF token
    if (!csrfTokenFromCookie || !csrfToken || csrfTokenFromCookie !== csrfToken) {
      return NextResponse.json({ message: "Invalid CSRF" }, { status: 403 });
    }

    // Cek apakah user ada di database
    const affiliator = await Affiliator.findOne({ email });
    if (!affiliator) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Bandingkan password dengan hash di database
    const isMatch = await bcrypt.compare(password, affiliator.password_hash);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: affiliator._id, email: affiliator.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Simpan token di cookies HTTP-only
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("affiliator_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Login Error:", error);
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}
