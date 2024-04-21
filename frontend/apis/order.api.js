import axios from "axios";
import { CANCEL_URL, SERVER_URL, SUCCESS_URL } from "./config.api";

const checkOut = async ({ bookId, bookPrice }) => {
  const res = await axios.post(`${SERVER_URL}/order/checkout`, {
    book_id: bookId,
    book_price: bookPrice,
  });

  if (res?.data?.status !== 200) throw new Error(res?.data?.message);

  return res?.data?.metadata;
};

const payment = async ({ bookId, bookPrice }) => {
  const res = await axios.post(`${SERVER_URL}/order/create-payment-link`, {
    orderInfo: {
      amount: bookPrice,
      description: "Thanh toan sach",
      returnUrl: SUCCESS_URL,
      cancelUrl: CANCEL_URL,
    },
    book_id: bookId,
  });

  if (res?.data?.status !== 200) throw new Error(res?.data?.message);

  return res?.data?.metadata;
};

const checkOrderPaid = async ({ orderId }) => {
  const res = await axios.get(
    `${SERVER_URL}/order/check-payment/${JSON.parse(orderId)}`
  );
  if (res?.data?.status !== 200) throw new Error(res?.data?.message);
  return res?.data?.metadata;
};

const updateOrderStatus = async ({ orderId }) => {
  const res = await axios.patch(`${SERVER_URL}/order/${JSON.parse(orderId)}`);
  if (res?.data?.status !== 200) throw new Error(res?.data?.message);

  return res?.data?.metadata;
};

export { checkOut, payment, checkOrderPaid, updateOrderStatus };
