import { ORDER_STATUS_COLOR_MAPPING, ORDER_STATUS_TEXT_MAPPING } from "@/const";
import { HistoryOrder } from "@/types/order";
import { FC, useEffect, useState } from "react";

type Props = { order: HistoryOrder; onClickOrderCard: (id: string) => void };

export const OrderCard: FC<Props> = ({ order, onClickOrderCard }) => {
  const createdAt = order.createdAt.split("T")[0];

  const orderCardBorderColor = ORDER_STATUS_COLOR_MAPPING[order.status];
  const statusText = ORDER_STATUS_TEXT_MAPPING[order.status];

  return (
    <div
      onClick={() => onClickOrderCard(order.id)}
      className={`border-4 p-4 grid shadow-md grid-cols-[1fr_100px] ${orderCardBorderColor}`}
    >
      <div className="grid gap-y-2">
        <p>表品名：{order.orderName}</p>
        <p>注文時刻：{createdAt}</p>
        <p>本当に届けてほしい：{order.customInfoConfirm ? "はい" : "いいえ"}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>{statusText}</p>
      </div>
      <p className="text-sm  col-span-2 mt-4 text-center">タップするとより詳細な情報が見れます</p>
    </div>
  );
};
