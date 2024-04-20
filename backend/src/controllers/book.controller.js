import BookService from "../services/book.service.js";
import SuccessResponse from "../core/success.response.js";

class BookController {
    async getAllBooks(req, res) {
        const data = await BookService.getAllBooks();

        return new SuccessResponse({
            message: "Get all books successfully",
            statusCode: 200,
            metadata: data,
        }).send(res);
    }
}

export default new BookController();
