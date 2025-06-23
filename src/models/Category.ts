 import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICategoryWithId extends ICategory {
    _id: string; // Mongoose adds _id field by default
}

const CategorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
