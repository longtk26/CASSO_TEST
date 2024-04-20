import BookModel from "../models/book.model.js";

class BookService {
    static async getAllBooks() {
        return await BookModel.find().select("-book_link_download").lean();
    }
}

export default BookService;
