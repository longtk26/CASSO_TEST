import { Schema, mongoose } from "mongoose";

const DOCUMENT_NAME = "book";
const COLLECTION_NAME = "books";

const bookSchema = new Schema(
    {
        book_title: {
            type: String,
            required: true,
            trim: true,
        },
        book_image: {
            type: String,
            default: "",
        },
        book_price: {
            type: Number,
            required: true,
        },
        book_link_download: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const BookModel = mongoose.model(DOCUMENT_NAME, bookSchema);

export default BookModel;
