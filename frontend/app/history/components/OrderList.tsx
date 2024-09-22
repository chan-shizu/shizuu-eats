"use client";

import { FC, useEffect, useState } from "react";
import { OrderCard } from "./OrderCard";
import { HistoryOrder } from "@/types/order";
import { HistoryOrderModal } from "./HistoryOrderModal";
import { fetchOrder } from "../actions/fetchOrder";

type Props = {};

export const OrderList: FC<Props> = () => {
  const [orders, setOrders] = useState<HistoryOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onClickOrderCard = (id: string) => {
    setSelectedOrderId(id);
  };

  useEffect(() => {
    (async () => {
      const orderIdsJson = localStorage.getItem("orderIds");
      if (!orderIdsJson) return;
      const orderIds: string[] = JSON.parse(orderIdsJson);

      const results = await Promise.all(orderIds.map((orderId) => fetchOrder(orderId)));

      const resultWithoutNull = results.filter((result) => result !== null);

      setIsLoading(false);
      if (!resultWithoutNull) return;

      setOrders(resultWithoutNull);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!orders.length || orders.length == 0) {
    return <p className="p-5">注文はありません。</p>;
  }

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <>
      <div className="p-6 grid gap-y-4">
        {orders.map((order) => (
          <OrderCard order={order} onClickOrderCard={onClickOrderCard} key={order.id} />
        ))}
      </div>
      {selectedOrder && <HistoryOrderModal order={selectedOrder} onClickOrderCard={onClickOrderCard} />}
    </>
  );
};
