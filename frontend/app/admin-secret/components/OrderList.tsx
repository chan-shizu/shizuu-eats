"use client";

import { AdminOrder } from "@/types/order";
import { FC, useState } from "react";
import { OrderCard } from "./OrderCard";
import { OrderModal } from "./OrderModal";

type Props = { orders: AdminOrder[] };

export const OrderList: FC<Props> = ({ orders }) => {
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const onClickOrderCard = (id: string) => {
    setSelectedOrderId(id);
  };

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  return (
    <section>
      <h2 className="text-2xl">位置情報更新</h2>
      <div className="grid gap-y-3 mt-4">
        {orders.map((order) => (
          <OrderCard order={order} onClickOrderCard={onClickOrderCard} key={order.id} />
        ))}
      </div>
      {selectedOrder && <OrderModal order={selectedOrder} onClickOrderCard={onClickOrderCard} />}
    </section>
  );
};
