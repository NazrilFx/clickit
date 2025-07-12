import connectDb from '@/lib/connectDB';
import { NextResponse } from 'next/server';
import Link from '@/models/Link';
import LinkVisitorIps from '@/models/LinkVisitorIps';
import GlobalVisitorIps from '@/models/GlobalVisitorIps';
import Affiliator from '@/models/Affiliator';
import LinkTakenByUser from '@/models/LinkTakenByUser';

export async function GET(req: Request, context: { params: Promise<{ uid: string }> }) {
    await connectDb();

    try {
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor?.split(",")[0] || "Unknown";
        const { searchParams } = new URL(req.url)

        const a = searchParams.get("a") // "a" means affiliator query
        if (a == null || a == "") {
            return NextResponse.json({ error: 'Query a is null' }, { status: 404 });
        }

        const uid = (await context.params).uid;

        const link = await Link.findOne({ linkUid: uid });

        if (!link) {
            return NextResponse.json({ error: 'Link not found', ip }, { status: 404 });
        }

        if (link.clicksAvailable <= 0) {
            return NextResponse.json({ error: 'Link has no available clicks', ip }, { status: 404 });
        } 

        const existingLinkIps = await LinkVisitorIps.find({ ip, linkUid: uid })
        const existingGlobalIps = await GlobalVisitorIps.find({ ip })

        if (existingLinkIps.length > 0) {
            // return NextResponse.json({ message: "Redirect successl without adding total_clicks to the link because LinkIps is existing" });
            return NextResponse.redirect(link.redirectUrl);
        }

        if (existingGlobalIps.length > 0) {
            // return NextResponse.json({ message: "Redirect successl without adding total_clicks to the link because GlobalIps is existing" });
            return NextResponse.redirect(link.redirectUrl);
        }

        const affiliator = await Affiliator.findOne({ uid: a });
        if (!affiliator) {
            return NextResponse.json({ error: 'Affiliator not found', ip }, { status: 404 });
        }

        await LinkTakenByUser.findOneAndUpdate(
            { linkUid: uid, affiliator_id: affiliator._id },
            { $inc: { clicks_obtained: 1, earned_idr: process.env.AFFILIATOR_COMMISSION_RP! } }, // Increment clicks and earned_idr
        )

        await Affiliator.findByIdAndUpdate(
            affiliator._id,
            {
                $inc: {
                    balance_idr: Number(process.env.AFFILIATOR_COMMISSION_RP!),
                    total_clicks_obtained: 1
                }
            }
        )

        await LinkVisitorIps.create({
            ip,
            linkUid: uid,
        });

        await GlobalVisitorIps.create({
            ip
        });

        const updatedLink = await Link.findByIdAndUpdate(
            link._id,
            {
                $inc: {
                    totalClicks: 1,
                    clicksAvailable: -1
                }
            },
            { new: true }
        );


        if (!updatedLink) {
            return NextResponse.json({ error: 'Error while updating link', updatedLink }, { status: 400 });
        }

        // return NextResponse.json({ message: "redirect successfull" });
        return NextResponse.redirect(link.redirectUrl);
    } catch (error: unknown) {
        let errorMessage = "Internal Server Error";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ link: null, error: errorMessage }, { status: 500 });
    }
}
