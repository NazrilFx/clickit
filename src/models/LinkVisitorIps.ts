import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILinkVisitorIps extends Document {
    ip: string;
    linkUid: string; // Refferens to owner
    created_at: Date;
}

const LinkVisitorIpsSchema: Schema<ILinkVisitorIps> = new Schema({
    ip: { type: String, required: true },
    linkUid: { type: String, required: true }, // Relation to User
    created_at: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 3 }, // Automatic removed after 3 days
});

const LinkVisitorIps: Model<ILinkVisitorIps> = mongoose.models.LinkVisitorIps || mongoose.model<ILinkVisitorIps>("LinkVisitorIps", LinkVisitorIpsSchema);
export default LinkVisitorIps;
