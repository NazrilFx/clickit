import jwt from "jsonwebtoken";
import connectDB from "@/lib/connectDB";
import Affiliator from "@/models/Affiliator";
import getCookieToken from "../getCookieToken";

export async function getCurrentAffiliator(req: Request) {
    await connectDB();
    const token = getCookieToken(req, "affiliator_token");

    if (!token) return null;

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        if (!decoded || typeof decoded === "string" || !decoded.id) {
            return null;
        }

        // Ambil affiliator dari database tanpa password_hash
        const affiliator = await Affiliator.findById(decoded.id).select("-password_hash");

        if (!affiliator) return null;

        return affiliator;
    } catch (error: unknown) {
        let errorMessage = "Internal Server Error";

        if (error instanceof Error) {
            errorMessage = error.message;
            console.error("Error in getCurrentAffiliator:", errorMessage);
        }
        return null;
    }
}