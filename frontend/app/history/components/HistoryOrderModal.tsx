"use client";

import { ORDER_STATUS_COLOR_MAPPING, ORDER_STATUS_TEXT_MAPPING } from "@/const";
import { HistoryOrder } from "@/types/order";
import { FC } from "react";

type Props = { order: HistoryOrder; onClickOrderCard: (id: string) => void };

export const HistoryOrderModal: FC<Props> = ({ order, onClickOrderCard }) => {
  const createdAt = order.createdAt.split("T")[0];
  const estimatedArrivalTime = order.estimatedArrivalTime ? order.estimatedArrivalTime.split("T")[0] : "";
  const statusText = ORDER_STATUS_TEXT_MAPPING[order.status];

  return (
    <div className="w-full h-full fixed inset-0 p-10 z-20">
      <div className="bg-white z-10 w-full h-full p-5 relative shadow-xl">
        <h2 className="text-center text-3xl">注文詳細</h2>
        <div className="grid gap-y-3 mt-4">
          <p>注文名：{order.orderName}</p>
          <p>備考：{order.orderRemark}</p>
          <p>予算：{order.orderBudget}</p>
          <p>本当に届けてほしい：{order.customInfoConfirm ? "はい" : "いいえ"}</p>
          <p>ステータス：{statusText}</p>
          <p>コメント：{order.comment}</p>
          <p>注文時刻：{createdAt}</p>
          <p>到着予定時刻：{estimatedArrivalTime}</p>
        </div>
        <button className="mt-5 w-full h-16 rounded-full bg-sky-300" onClick={() => onClickOrderCard("")}>
          閉じる
        </button>
      </div>
    </div>
  );
};
