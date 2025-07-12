import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    store_id: mongoose.Types.ObjectId; // Referensi ke store
    midtrans_token: string
    customer_name: string;
    customer_email: string;
    order_number: number;
    status: "pending" | "paid" | "cancelled";
    total_amount: number;
    tax_amount: number;
    payment_method: string,
    created_at: Date;
    updated_at: Date
}

const orderSchema = new mongoose.Schema(
    {
        store_id: { type: Schema.Types.ObjectId, ref: "Store", required: true }, // Relasi ke vendor
        midtrans_token: { type: String, required: true },
        customer_name: { type: String, required: true },
        customer_email: { type: String, required: true },
        order_number: { type: Number, required: true, unique: true, default: 0 },
        status: {
            type: String,
            enum: ["pending", "paid", "cancelled"],
            default: "pending",
        },
        total_amount: { type: Number, required: true },
        tax_amount: { type: Number, required: true },
        payment_method: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
);

// Middleware untuk memperbarui `updated_at` setiap kali dokumen diubah
orderSchema.pre("save", function (next) {
    this.updated_at = new Date();
    next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;