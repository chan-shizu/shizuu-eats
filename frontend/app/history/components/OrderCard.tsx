import { HistoryOrder } from "@/types/historyOrder";
import { FC } from "react";

type Props = { order: HistoryOrder; onClickOrderCard: (id: string) => void };

export const OrderCard: FC<Props> = ({ order, onClickOrderCard }) => {
  const createdAt = order.createdAt.split("T")[0];

  let statusText = "";
  let statusColor = "";
  if (order.status === "INITIAL") {
    statusText = "注文完了";
    statusColor = "green-200";
  } else if (order.status === "ACCEPTED") {
    statusText = "確認中";
    statusColor = "red-200";
  } else if (order.status === "DENIED") {
    statusText = "キャンセル";
    statusColor = "yellow-400";
  } else if (order.status === "PROGRESS") {
    statusText = "移動中";
    statusColor = "border-pink-300";
  } else if (order.status === "COMPLETED") {
    statusText = "完了";
    statusColor = "border-gray-300";
  }

  return (
    <div
      onClick={() => onClickOrderCard(order.id)}
      className={`border-4 p-4 grid grid-cols-[1fr_100px] border-gray-300 aborder-${statusColor} `}
    >
      <div className="grid gap-y-2">
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
