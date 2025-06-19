 import mongoose, { Schema, Document, Model } from "mongoose";
 
 export interface IAffiliator extends Document {
   name: string;
   email: string;
   password_hash: string;
   phone: string;
   profile_image?: string;
   created_at: Date;
   updated_at: Date;
 }
 
 const AffiliatorSchema: Schema<IAffiliator> = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password_hash: { type: String, required: true },
   phone: { type: String, required: false },
   profile_image: { type: String, required: false, default: "" },
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
 