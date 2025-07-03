import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import LinkTakenByUser from "@/models/LinkTakenByUser";
import { getCurrentAffiliator } from "@/utils/auth/getCurrentAffiliator";

export async function GET(req: Request) {
    await connectDB()
    try {
        const affiliator = await getCurrentAffiliator(req);
        const links = await LinkTakenByUser.aggregate([
            {
                $match: {
                    affiliator_id: affiliator?._id // Mencari data berdasarkan ID affiliator
                }
            },
            {
                $lookup: { // Mengambil data dari koleksi lain yaitu "links"
                    from: "links", // nama koleksi lain
                    localField: "linkUid", // field dari koleksi ini
                    foreignField: "linkUid", // field dari koleksi tujuan
                    as: "linkData" // nama field baru yang akan berisi data dari koleksi lain
                }
            },
            {
                $unwind: "$linkData" // ubah data yang diambil berupa array menjadi objek
            },
            {
                $project: { // Hasil akhrir yang akan direturn
                    _id: 1,
                    linkUid: 1,
                    earned_idr: 1,
                    created_at: 1,
                    "linkName": "$linkData.name",
                    "description": "$linkData.description"
                }
            }
        ]);


        return NextResponse.json({ links }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error created a new LinkTakenByUser : ", error);
        return NextResponse.json({ message }, { status: 500 });
    }
}