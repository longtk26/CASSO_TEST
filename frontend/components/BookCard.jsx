"use client";

import { checkOut, payment } from "@/apis/order.api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useState } from "react";
import Loading from "@/app/loading";

const BookCard = ({
  bookTitle,
  bookPrice,
  bookImage,
  bookId,
  typeButton = "checkout",
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async ({ bookId, bookPrice }) => {
    try {
      setLoading(true);
      const checkOutInfo = await checkOut({ bookId, bookPrice });
      setLoading(false);
      localStorage.setItem("checkOutInfo", JSON.stringify(checkOutInfo));
      router.push("/checkout");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async ({ bookId, bookPrice }) => {
    try {
      setLoading(true);
      const paymentInfo = await payment({ bookId, bookPrice });
      localStorage.setItem(
        "orderId",
        JSON.stringify(paymentInfo?.orderInfo?._id)
      );
      setLoading(false);
      router.push(paymentInfo?.paymentLink?.checkoutUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const matchButton = {
    checkout: {
      type: "checkout",
      handleOnClick: () => handleCheckout({ bookId, bookPrice }),
    },
    payment: {
      type: "payment",
      handleOnClick: () => handlePayment({ bookId, bookPrice }),
    },
  };

  return (
    <div className="flex justify-around items-center border-2 p-4 rounded-lg w-full">
      <div>
        <Image
          src={bookImage ?? ""}
          width={200}
          height={400}
          alt="Book cover"
        />
      </div>
      <div className="space-y-4 w-[30%]">
        <h3 className="font-bold text-2xl">{bookTitle ?? ""}</h3>

        <div>
          <p className="font-bold flex justify-between items-center">
            Price: <span className="font-normal block">{bookPrice ?? ""}đ</span>
          </p>
        </div>
        <Button
          type={matchButton[typeButton].type}
          handleOnClick={matchButton[typeButton].handleOnClick}
        />
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default BookCard;
