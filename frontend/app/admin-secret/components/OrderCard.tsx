import { ORDER_STATUS_COLOR_MAPPING, ORDER_STATUS_TEXT_MAPPING } from "@/const";
import { AdminOrder } from "@/types/order";
import { FC } from "react";
type Props = { order: AdminOrder; onClickOrderCard: (id: string) => void };

export const OrderCard: FC<Props> = ({ order, onClickOrderCard }) => {
  const createdAt = order.createdAt.split("T")[0];
  const statusText = ORDER_STATUS_TEXT_MAPPING[order.status];

  let borderColor = "";
  if (order.status === "INITIAL") {
    borderColor = "border-green-200";
  } else if (order.status === "ACCEPTED") {
    borderColor = "border-red-200";
  } else if (order.status === "DENIED") {
    borderColor = "border-yellow-400";
  } else if (order.status === "PROGRESS") {
    borderColor = "border-pink-300";
  } else if (order.status === "COMPLETED") {
    borderColor = "border-gray-300";
  }

  return (
    <div
      onClick={() => onClickOrderCard(order.id)}
      className={`border-4 p-4 grid grid-cols-[1fr_100px] ${borderColor}`}
    >
      <div className="grid gap-y-1">
        <p>注文者：{order.customInfoName}</p>
        <p>表品名：{order.orderName}</p>
        <p>注文時刻：{createdAt}</p>
        <p>本当に届けてほしい：{order.customInfoConfirm ? "はい" : "いいえ"}</p>
      </div>
      <div className="flex justify-center items-center">
        <p>{statusText}</p>
      </div>
    </div>
  );
};
