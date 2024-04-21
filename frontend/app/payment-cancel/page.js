"use client";

import { updateOrderStatus } from "@/apis/order.api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../loading";

const PaymentCancel = () => {
  const [orderCode, setOrderCode] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const orderId = localStorage.getItem("orderId");

    if (orderId) {
      const fetchOrder = async () => {
        try {
          if (orderId) {
            setLoading(true);
            const order = await updateOrderStatus({ orderId });
            setOrderCode(order?.order_code);
            localStorage.clear();
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchOrder();
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
      {loading && <Loading />}
    </div>
  );
};

export default PaymentCancel;
