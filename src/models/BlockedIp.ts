import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlockedIp extends Document {
    ip: string;
    created_at: Date;
}

const BlockedIpSchema: Schema<IBlockedIp> = new Schema({
    ip: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 }, // Automatic removed after 7 days for avoid spam
});

const BlockedIp: Model<IBlockedIp> = mongoose.models.BlockedIp || mongoose.model<IBlockedIp>("BlockedIp", BlockedIpSchema);
export default BlockedIp;
