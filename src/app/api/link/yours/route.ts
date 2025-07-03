import { NextResponse } from "next/server";
import Link from "@/models/Link";
import connectDB from "@/lib/connectDB";
import { getCurrentUser } from "@/utils/auth/getCurrentUser";
import LinkTakenByUser from "@/models/LinkTakenByUser";

export async function GET(req: Request) {
  await connectDB();

  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json({ links: null }, { status: 401 });
    }

    const links = await Link.find({ user_id: user._id })
    const linkUids = links.map(link => link.linkUid);

    const linksTakenByAffiliator = await LinkTakenByUser.countDocuments({ linkUid: { $in: linkUids } });

    return NextResponse.json({ links, linksTakenByAffiliator }, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ link: null, error: errorMessage }, { status: 401 });
  }
}
