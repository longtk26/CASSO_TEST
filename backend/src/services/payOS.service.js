import BookModel from "../models/book.model.js";
import ErrorResponse from "../core/error.response.js";
import payos from "../config/payOS.config.js";
import { getUniqueNumber } from "../utils/index.js";
import OrderModel from "../models/order.model.js";

class PayOsService {
    static async checkOut({ book_id, book_price }) {
        // Check book exist
        const foundBook = await BookModel.findOne({ _id: book_id });
        if (!foundBook) throw new ErrorResponse("Not found book", 404);

        // Check book price
        if (book_price !== foundBook.book_price)
            throw new ErrorResponse("Price is not correct", 400);

        const infoOrder = {
            book_id: foundBook._id,
            book_title: foundBook.book_title,
            book_price: foundBook.book_price,
            book_image: foundBook.book_image,
        };

        return infoOrder;
    }

    static async createPaymentLink({ orderInfo, book_id }) {
        const orderCode = getUniqueNumber();

        const order = {
            ...orderInfo,
            orderCode,
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
                order_status: "paid",
            },
            {
                upsert: true,
                new: true,
            }
        );
        return updateOrder;
    }

    static async checkPayment({ order_id }) {
        const order = await OrderModel.findOne({ _id: order_id });
        if (!order) throw new ErrorResponse("Order not found", 404);

        if (order.order_status !== "paid")
            throw new ErrorResponse("Order not paid", 400);

        const foundBook = await BookModel.findOne({ _id: order.order_bookId });

        if (!foundBook)
            throw new ErrorResponse(
                "Some thing wrong with order information",
                400
            );

        return foundBook;
    }
}

export default PayOsService;
