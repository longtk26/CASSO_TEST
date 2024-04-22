import { getALlBooks } from "@/apis/books.api";
import BookCard from "./BookCard";

const Ebooks = async () => {
  const books = await getALlBooks();

  return (
    <main className="my-32">
      <h2 className="mb-20 text-center text-2xl uppercase font-bold text-primary">
        Ebooks
      </h2>
      <section className="flex px-4 lg:px-0">
        <div className="max-w-6xl flex flex-col justify-center grow mx-auto space-y-4">
          {books.map((book) => (
            <BookCard
              key={book._id}
              bookTitle={book.book_title}
              bookPrice={book.book_price}
              bookImage={book.book_image}
              bookId={book._id}
              typeButton="checkout"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Ebooks;
