import mongoose, { Schema, Document } from "mongoose";

export interface ILinkTakenByUser extends Document {
  affiliator_id: mongoose.Types.ObjectId;
  clicks_obtained: number; 
  earned_idr: number;
  linkUid: string;
  created_at: Date;
}

const LinkTakenByUserSchema: Schema<ILinkTakenByUser> = new Schema({
  affiliator_id: { type: Schema.Types.ObjectId, required: true }, // ID user, bisa dari mana saja
  clicks_obtained: { type: Number, required: false, default: 0 }, 
  earned_idr: { type: Number, required: false, default: 0 }, // Total IDR yang didapatkan dari link ini
  linkUid: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});

const LinkTakenByUser = mongoose.models.LinkTakenByUser || mongoose.model<ILinkTakenByUser>("LinkTakenByUser", LinkTakenByUserSchema);
export default LinkTakenByUser;