import { NextResponse } from "next/server";
import Link from "@/models/Link";
import Activity from "@/models/Activity";
import connectDB from "@/lib/connectDB";
import getCookieToken from "@/utils/getCookieToken";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, description, redirectUrl, images, video, user_id, category_id, csrfToken, targetLocations } = await req.json();
        const csrfTokenFromCookie = getCookieToken(req, "csrf_secret"); 
        let uid: string;

        do {
            uid = nanoid(8)
        } while (await Link.findOne({ linkUid : uid })); // Generate unique linkUid

        if (!csrfTokenFromCookie || !csrfToken || csrfTokenFromCookie !== csrfToken) {
            return NextResponse.json({ message: "Invalid CSRF" }, { status: 403 });
        }

        //  Cek apakah nama link sudah ada
        const existingLinkName = await Link.findOne({
            name: name,           // atau cukup `name` jika variabel sama
            user_id: user_id,     // pastikan userId adalah ObjectId atau string yang valid
        });
        if (existingLinkName) {
            return NextResponse.json({ message: "Name already exist" }, { status: 400 });
        }
       // Simpan user ke database
        const newLink = new Link({
            name, 
            linkUid: uid,
            description,
            redirectUrl,
            image: images || [], // Be empty string if not provided
            video: video || "", // Be empty string if not provided
            targetLocations, // Be empty array if not provided
            user_id, // Refferens to user
            category_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await newLink.save();

        const newActivity = new Activity({
            user_id,
            user_role: "user",
            action: `User ${name} created a new link with name ${name}`,
            created_at: new Date(),
        })

        await newActivity.save()

        return NextResponse.json({ message: "Link created successfully!" }, { status: 201 });
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error created a new link : ", error);
        return NextResponse.json({ message }, { status: 500 });

    }
}