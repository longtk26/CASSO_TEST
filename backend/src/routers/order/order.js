import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import orderController from "../../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.post("/checkout", asyncHandler(orderController.checkOut));
orderRoute.post("/create-payment-link", asyncHandler(orderController.payment));
orderRoute.post("/payment-hook", asyncHandler(orderController.paymentHook));
orderRoute.get(
    "/check-payment/:orderId",
    asyncHandler(orderController.checkPayment)
);

export default orderRoute;
