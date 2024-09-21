import { ORDER_STATUS_COLOR_MAPPING, ORDER_STATUS_TEXT_MAPPING } from "@/const";
import { AdminOrder } from "@/types/order";
import { FC } from "react";
type Props = { order: AdminOrder; onClickOrderCard: (id: string) => void };

export const OrderCard: FC<Props> = ({ order, onClickOrderCard }) => {
  const createdAt = order.createdAt.split("T")[0];
  const orderCardBorderColor = ORDER_STATUS_COLOR_MAPPING[order.status];
  const statusText = ORDER_STATUS_TEXT_MAPPING[order.status];

  return (
    <div
      onClick={() => onClickOrderCard(order.id)}
      className={`border-4 p-4 grid grid-cols-[1fr_100px] ${orderCardBorderColor}`}
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
