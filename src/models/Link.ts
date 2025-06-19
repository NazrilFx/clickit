import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILink extends Document {
    name: string;
    description: string;
    redirectUrl: string;
    image?: string
    video?: string;
    user_id: mongoose.Types.ObjectId; // Refferens to store
    category_id: mongoose.Types.ObjectId; // Refferens to category
    created_at: Date;
    updated_at: Date;
}

const LinkSchema: Schema<ILink> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    image: { type: String, required: false },
    user_id: { type: Schema.Types.ObjectId, ref: "Store", required: true }, // Relasi ke vendor
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Relasi ke vendor
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
