import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILink extends Document {
    name: string;
    linkUid: string;
    description: string;
    redirectUrl: string;
    image?: string[];
    video?: string;
    totalClicks: number;
    clicksAvailable: number; // Optional field to indicate if the link is available
    targetLocations: string[]; // Optional field to store target locations
    user_id: mongoose.Types.ObjectId; // Refferens to owner
    category_id: mongoose.Types.ObjectId; // Refferens to category
    created_at: Date;
    updated_at: Date;
}

export interface ILinkWithId extends ILink, Document {
    _id: string;
}

const LinkSchema: Schema<ILink> = new Schema({
    name: { type: String, required: true },
    linkUid: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    totalClicks: { type: Number, default: 0 },
    clicksAvailable: { type: Number, default: 0 },
    image: { type: [String], required: false },
    video: { type: String, required: false },
    targetLocations: { type: [String], required: false, default: [] }, // Array of strings to store target locations
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Relation to User
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Relation to Category
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// Middleware untuk memperbarui `updated_at` setiap kali dokumen diubah
LinkSchema.pre("save", function (next) {
    this.updated_at = new Date();
    next();
});

const Link: Model<ILink> = mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);
export default Link;
