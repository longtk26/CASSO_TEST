"use client";

import { checkOrderPaid } from "@/apis/order.api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

const PaymentSuccess = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    const fetchOrder = async () => {
      try {
        if (orderId) {
          setLoading(true);
          const order = await checkOrderPaid({ orderId });
          setLink(order);
          localStorage.clear();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="mt-32">
      <h2 className="mb-20 text-center text-2xl uppercase font-bold text-primary">
        Thanh toán thành công
      </h2>
      {link !== "" && (
        <section className="flex">
          <div className="max-w-6xl flex flex-col justify-center grow mx-auto space-y-4">
            <Link
              href={link?.book_link_download ?? ""}
              target="_blank"
              className="font-bold text-center font-2xl text-blue-500"
            >
              Click vào đây để tải sách
            </Link>
            <p className="text-red-500 text-center">
              Lưu ý: Link sẽ mất khi bạn reload lại trang vì vậy hãy download
              sách ngay khi thấy link tải nhé!
            </p>
          </div>
        </section>
      )}
      <Link href={"/"} className="mt-10 text-center font-bold block">
        Trở lại trang chủ
      </Link>
      {loading && <Loading />}
    </div>
  );
};

export default PaymentSuccess;
