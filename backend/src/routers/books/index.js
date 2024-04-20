import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import bookController from "../../controllers/book.controller.js";

const booksRoute = Router();

booksRoute.get("/", asyncHandler(bookController.getAllBooks));

export default booksRoute;
