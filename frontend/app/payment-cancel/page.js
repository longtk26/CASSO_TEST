"use client";

import { updateOrderStatus } from "@/apis/order.api";
import Link from "next/link";
import { useEffect, useState } from "react";

const PaymentCancel = () => {
  const [orderCode, setOrderCode] = useState(null);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");

    if (orderId) {
      updateOrderStatus({ orderId }).then((res) => {
        setOrderCode(res?.order_code);
        localStorage.clear();
      });
    }
  }, []);

  return (
    <div className="mt-32">
      {orderCode && (
        <>
          <h2 className="mb-20 text-center text-2xl uppercase font-bold text-red-500">
            Đơn hàng {orderCode} đã hủy
          </h2>
        </>
      )}
      <Link href={"/"} className="mt-10 text-center font-bold block">
        Trở lại trang chủ
      </Link>
    </div>
  );
};

export default PaymentCancel;
