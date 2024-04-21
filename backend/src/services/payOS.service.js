import BookModel from "../models/book.model.js";
import ErrorResponse from "../core/error.response.js";
import payos from "../config/payOS.config.js";
import { getUniqueNumber } from "../utils/index.js";
import OrderModel from "../models/order.model.js";

class PayOsService {
    static async createPaymentLink({ orderInfo, book_id }) {
        const orderCode = getUniqueNumber();
        const foundBook = await BookModel.findOne({ _id: book_id });
        if (!foundBook) throw new ErrorResponse("Book not found", 404);

        const order = {
            ...orderInfo,
            orderCode,
            amount: foundBook.book_price,
        };

        const paymentLink = await payos.createPaymentLink(order);

        const newOrder = await OrderModel.create({
            order_bookId: book_id,
            order_price: order.amount,
            order_code: orderCode,
        });

        if (!newOrder) throw new ErrorResponse("Order not created", 400);

        const paymentInfo = {
            paymentLink,
            orderInfo: newOrder,
        };
        console.log(paymentInfo);
        return paymentInfo;
    }

    static async paymentHook(paymentInfo) {
        const updateOrder = await OrderModel.findOneAndUpdate(
            { order_code: paymentInfo.data.orderCode },
            {
                order_status: "PAID",
            },
            {
                upsert: true,
                new: true,
            }
        );
        return updateOrder;
    }
}

export default PayOsService;
