import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAffiliator extends Document {
  uid: string; // Unique identifier for the affiliator
  name: string;
  email: string;
  password_hash: string;
  phone: string;
  profile_image?: string;
  balance_idr: number;
  total_clicks_obtained: number;
  created_at: Date;
  updated_at: Date;
}

export interface IAffiliatorWithId extends IAffiliator {
  _id: mongoose.Types.ObjectId;
}

const AffiliatorSchema: Schema<IAffiliator> = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, required: false },
  profile_image: { type: String, required: false, default: "" },
  balance_idr: { type: Number, required: true, default: 0 },
  total_clicks_obtained: { type: Number, required: true, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Middleware for updating updated_at
AffiliatorSchema.pre<IAffiliator>("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Affiliator: Model<IAffiliator> = mongoose.models.Affiliator || mongoose.model<IAffiliator>("Affiliator", AffiliatorSchema);
export default Affiliator;
