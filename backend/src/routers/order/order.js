import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import orderController from "../../controllers/order.controller.js";
import payos from "../../config/payOS.config.js";

const orderRoute = Router();

orderRoute.post("/checkout", asyncHandler(orderController.checkOut));
orderRoute.post("/create-payment-link", asyncHandler(orderController.payment));
orderRoute.post("/payment-hook", asyncHandler(orderController.paymentHook));

orderRoute.get(
    "/check-payment/:orderId",
    asyncHandler(orderController.checkOrderPaid)
);

orderRoute.patch("/:orderId", asyncHandler(orderController.updateOrderStatus));

export default orderRoute;
