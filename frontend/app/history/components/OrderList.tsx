"use client";

import { FC, useEffect, useState } from "react";
import { OrderCard } from "./OrderCard";
import { HistoryOrder } from "@/types/order";
import { HistoryOrderModal } from "./HistoryOrderModal";

type Props = {};

export const OrderList: FC<Props> = () => {
  const [orders, setOrders] = useState<HistoryOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const onClickOrderCard = (id: string) => {
    setSelectedOrderId(id);
  };

  useEffect(() => {
    (async () => {
      const orderIdsJson = localStorage.getItem("orderIds");
      if (!orderIdsJson) return;
      const orderIds: string[] = JSON.parse(orderIdsJson);

      const responses = await Promise.all(
        orderIds.map((orderId) =>
          fetch(`${process.env.NEXT_PUBLIC_API_CLIENT_END_POINT}/orders/${orderId}`, {
            cache: "no-store",
          })
        )
      );

      const results = await Promise.all(
        responses.map((res) => {
          if (!res.ok) {
            return null;
          }
          return res.json();
        })
      );

      const resultWithoutNull = results.filter((result) => result !== null);

      if (!resultWithoutNull) return;

      setOrders(resultWithoutNull);
    })();
  }, []);

  if (!orders.length || orders.length == 0) {
    return <p className="p-5">注文はありません。</p>;
  }

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <>
      <div className="p-6 grid gap-y-4">
        {orders.map((order) => (
          <OrderCard order={order} onClickOrderCard={onClickOrderCard} />
        ))}
      </div>
      {selectedOrder && <HistoryOrderModal order={selectedOrder} onClickOrderCard={onClickOrderCard} />}
    </>
  );
};
