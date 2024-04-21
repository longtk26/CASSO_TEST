"use client";

import BookCard from "@/components/BookCard";
import { useEffect, useState } from "react";

const CheckOut = () => {
  const [checkOutInfo, setCheckOutInfo] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      setCheckOutInfo(JSON.parse(localStorage.getItem("checkOutInfo")));
    }
  }, []);

  return (
    <div className="mt-32">
      <h2 className="mb-20 text-center text-2xl uppercase font-bold text-primary">
        Kiểm tra thông tin Ebook
      </h2>
      <section className="flex">
        <div className="max-w-6xl flex flex-col justify-center grow mx-auto space-y-4">
          {checkOutInfo && (
            <BookCard
              bookId={checkOutInfo.book_id}
              bookTitle={checkOutInfo.book_title}
              bookPrice={checkOutInfo.book_price}
              bookImage={checkOutInfo.book_image}
              typeButton="payment"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
