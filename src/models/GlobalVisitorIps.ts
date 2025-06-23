import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGlobalVisitorIps extends Document {
    ip: string;
    created_at: Date;
}

const GlobalVisitorIpsSchema: Schema<IGlobalVisitorIps> = new Schema({
    ip: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: 60 * 60 * 1 }, // Automatic removed after 1 hours for avoid spam
});

const GlobalVisitorIps: Model<IGlobalVisitorIps> = mongoose.models.GlobalVisitorIps || mongoose.model<IGlobalVisitorIps>("GlobalVisitorIps", GlobalVisitorIpsSchema);
export default GlobalVisitorIps;
