import { Router } from "express";
import booksRoute from "./books/index.js";
import orderRoute from "./order/order.js";

const indexRoute = Router();

indexRoute.use("/books", booksRoute);
indexRoute.use("/order", orderRoute);

export default indexRoute;
