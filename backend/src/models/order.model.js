import { Schema, mongoose } from "mongoose";

const DOCUMENT_NAME = "order";
const COLLECTION_NAME = "orders";

const orderSchema = new Schema(
    {
        order_bookId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "book",
        },
        order_status: {
            type: String,
            required: true,
            enum: ["pending", "paid", "cancelled"],
            default: "pending",
        },
        order_price: {
            type: Number,
            required: true,
        },
        order_code: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const OrderModel = mongoose.model(DOCUMENT_NAME, orderSchema);

export default OrderModel;
