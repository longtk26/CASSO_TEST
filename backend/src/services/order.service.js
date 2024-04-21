import OrderModel from "../models/order.model.js";
import BookModel from "../models/book.model.js";
import ErrorResponse from "../core/error.response.js";
import payos from "../config/payOS.config.js";

class OrderService {
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

    static async checkOrderPaid({ order_id }) {
        const order = await OrderModel.findOne({ _id: order_id });
        if (!order) throw new ErrorResponse("Order not found", 404);

        if (order.order_status !== "PAID")
            throw new ErrorResponse("Order not paid", 400);

        const foundBook = await BookModel.findOne({ _id: order.order_bookId });

        if (!foundBook)
            throw new ErrorResponse(
                "Some thing wrong with order information",
                400
            );

        return foundBook;
    }

    static async updateOrderStatus({ orderId }) {
        const foundOrder = await OrderModel.findOne({ _id: orderId });
        if (!foundOrder) throw new ErrorResponse("Order not found", 404);

        const statusOrder = await payos.getPaymentLinkInformation(
            foundOrder.order_code
        );
        if (!statusOrder) throw new ErrorResponse("PayOS order not found", 404);

        const order = await OrderModel.findOneAndUpdate(
            {
                order_code: foundOrder.order_code,
            },
            {
                order_status: statusOrder.status,
            },
            {
                upsert: true,
                new: true,
            }
        );

        return order;
    }
}

export default OrderService;
