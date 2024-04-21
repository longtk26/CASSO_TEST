import SuccessResponse from "../core/success.response.js";
import OrderService from "../services/order.service.js";
import PayOsService from "../services/payOS.service.js";

class OrderController {
    async checkOut(req, res) {
        const data = await OrderService.checkOut(req.body);

        return new SuccessResponse({
            message: "Order checkout successfully",
            metadata: data,
            statusCode: 200,
        }).send(res);
    }

    async payment(req, res) {
        const data = await PayOsService.createPaymentLink(req.body);

        return new SuccessResponse({
            message: "Order paid successfully",
            metadata: data,
            statusCode: 200,
        }).send(res);
    }

    async paymentHook(req, res) {
        const data = await PayOsService.paymentHook(req.body);

        return new SuccessResponse({
            message: "Order paid successfully",
            metadata: data,
            statusCode: 200,
        }).send(res);
    }

    async checkOrderPaid(req, res) {
        const data = await OrderService.checkOrderPaid({
            order_id: req.params.orderId,
        });

        return new SuccessResponse({
            message: "Order checked successfully, this is link download",
            metadata: data,
            statusCode: 200,
        }).send(res);
    }

    async updateOrderStatus(req, res) {
        const data = await OrderService.updateOrderStatus({
            orderId: req.params.orderId,
        });

        return new SuccessResponse({
            message: "Order updated successfully",
            metadata: data,
            statusCode: 200,
        }).send(res);
    }
}

export default new OrderController();
