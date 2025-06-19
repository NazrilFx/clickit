// app/api/csrf/route.ts (Next.js App Router)
import { NextResponse } from "next/server";
import Tokens from "csrf";

const tokens = new Tokens();

export async function GET() {
  const secret = await tokens.secret();
  const token = tokens.create(secret);

  const response = NextResponse.json({ csrfToken: token });

  // Simpan secret di cookie HTTP-only
  response.cookies.set("csrf_secret", token, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
