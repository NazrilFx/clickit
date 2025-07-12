import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Affiliator from "@/models/Affiliator";
import Activity from "@/models/Activity";
import connectDB from "@/lib/connectDB";
import getCookieToken from "@/utils/getCookieToken";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, phone, csrfToken } = await req.json();
    const csrfTokenFromCookie = getCookieToken(req, "csrf_secret");
    let uid: string;

    do {
      uid = nanoid(8)
    } while (await Affiliator.findOne({ uid })); // Generate unique linkUid

    if (!csrfTokenFromCookie || !csrfToken || csrfTokenFromCookie !== csrfToken) {
      return NextResponse.json({ message: "Invalid CSRF" }, { status: 403 });
    }

    // Cek apakah email sudah ada
    const existingAffiliator = await Affiliator.findOne({ email });
    const existingAffiliatorNumber = await Affiliator.findOne({ phone });

    if (existingAffiliator) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    if (existingAffiliatorNumber) {
      return NextResponse.json({ message: "Phone already exists" }, { status: 400 });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Simpan Affiliator ke database 
    const newAffiliator = new Affiliator({
      uid,
      name,
      email,
      password_hash,
      phone,
      profile_image: "", // Kosong dulu
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newAffiliator.save();

    const user_id = newAffiliator._id

    const newActivity = new Activity({
      user_id,
      user_role: "affiliator",
      action: `User ${name} signed up with email ${email} as affiliator`,
      created_at: new Date(),
    })

    await newActivity.save()

    return NextResponse.json({ message: "Affiliator registered successfully!" }, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}