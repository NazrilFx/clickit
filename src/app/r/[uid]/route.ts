import connectDb from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import Link from '@/models/Link';
import LinkVisitorIps from '@/models/LinkVisitorIps';

export async function GET(req: Request, context: { params: { uid: string } }) {
    await connectDb();

    try {
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor?.split(",")[0] || "Unknown";

        const uid = context.params.uid;

        const link = await Link.findOne({ linkUid: uid });

        if (!link) {
            return NextResponse.json({ error: 'Link not found', ip }, { status: 404 });
        }

        await LinkVisitorIps.create({
            ip,
            linkUid: uid,
        });

        return NextResponse.redirect(link.redirectUrl);
    } catch (error: unknown) {
        let errorMessage = "Internal Server Error";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ link: null, error: errorMessage }, { status: 500 });
    }
}
