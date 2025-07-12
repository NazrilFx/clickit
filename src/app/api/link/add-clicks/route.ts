import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Link from "@/models/Link";
import getCookieToken from "@/utils/getCookieToken";

export async function POST(req: Request) {
    await connectDB()
    try {
        const { clicks, id, csrfToken } = await req.json();
        const csrfTokenFromCookie = getCookieToken(req, "csrf_secret");

        if (!csrfTokenFromCookie || !csrfToken || csrfTokenFromCookie !== csrfToken) {
            return NextResponse.json({ message: "Invalid CSRF" }, { status: 403 });
        }

        await Link.findByIdAndUpdate(id, {
            $inc: { clicksAvailable: clicks },
        }
        )
        return NextResponse.json({ message: "Update Clicks Link successfully!" }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error created a new LinkTakenByUser : ", error);
        return NextResponse.json({ message }, { status: 500 });
    }
}