import jwt from "jsonwebtoken";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import getCookieToken from "../getCookieToken";

export async function getCurrentUser(req: Request) {
    await connectDB();
    const token = getCookieToken(req, "user_token");

    if (!token) return null;

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        if (!decoded || typeof decoded === "string" || !decoded.id) {
            return null;
        }

        // Ambil user dari database tanpa password_hash
        const user = await User.findById(decoded.id).select("-password_hash");

        if (!user) return null;

        return user;
    } catch (error: unknown) {
        let errorMessage = "Internal Server Error";

        if (error instanceof Error) {
            errorMessage = error.message;
            console.error("Error in getCurrentUser:", errorMessage);
        }
        return null;
    }
}