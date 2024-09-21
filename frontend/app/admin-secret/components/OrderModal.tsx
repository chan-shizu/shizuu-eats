import { ORDER_STATUS_TEXT_MAPPING } from "@/const";
import { AdminOrder } from "@/types/order";
import { FC } from "react";
import { updateOrder } from "../actions/updateOrder";
import toast from "react-hot-toast";
type Props = { order: AdminOrder; onClickOrderCard: (id: string) => void };

export const OrderModal: FC<Props> = ({ order, onClickOrderCard }) => {
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const body: any = Object.fromEntries(form.entries());
    if (body.estimatedArrivalTime) {
      body.estimatedArrivalTime = body.estimatedArrivalTime + ":00Z";
    } else {
      body.estimatedArrivalTime = null;
    }
    const res = await updateOrder(body);
    if (!res) {
      toast.error("データの更新に失敗しました");
      return;
    }

    toast.success("データの更新に成功しました");
    window.location.reload();
  };

  const estimatedArrivalTime = order.estimatedArrivalTime
    ? order.estimatedArrivalTime.split("T")[0] +
      "T" +
      order.estimatedArrivalTime.split("T")[1].split(":")[0] +
      ":" +
      order.estimatedArrivalTime.split("T")[1].split(":")[1]
    : "";

  return (
    <div className="w-full h-full fixed inset-0 p-10 z-20">
      <form onSubmit={handleOnSubmit} className="bg-white z-10 w-full h-full p-5 relative shadow-xl overflow-y-auto">
        <h2 className="text-center text-3xl">注文詳細</h2>
        <div className="grid gap-y-5 mt-4">
          <div className="grid gap-y-3 bg-slate-200 text-sm p-2">
            <div className="flex gap-x-2">
              <label>id</label>
              <input className="bg-slate-200" readOnly name="id" value={order.id} />
            </div>
            <div className="flex gap-x-2">
              <p>距離</p>
              <p>{order.distance}</p>
            </div>
            <div className="flex gap-x-2">
              <p>所要時間（徒歩）</p>
              <p className="bg-slate-200">{order.walkingTime} </p>
            </div>
            <div className="flex gap-x-2">
              <p>所要時間（自転車）</p>
              <p className="bg-slate-200">{order.bicyclingTime} </p>
            </div>
            <div className="flex gap-x-2">
              <p>所要時間（自動車）</p>
              <p className="bg-slate-200">{order.driveTime}</p>
            </div>
            <div className="flex gap-x-2">
              <p>ユーザーの緯度</p>
              <p>{order.customerLatitude} </p>
            </div>
            <div className="flex gap-x-2">
              <p>ユーザーの経度</p>
              <p>{order.customerLongitude} </p>
            </div>
            <div className="flex gap-x-2">
              <p>ユーザーの地名</p>
              <p>{order.customerAreaName} </p>
            </div>
            <div className="flex gap-x-2">
              <p>俺の緯度</p>
              <p>{order.shizuyaLatitude} </p>
            </div>
            <div className="flex gap-x-2">
              <p>俺の経度</p>
              <p>{order.shizuyaLongitude} </p>
            </div>
            <div className="flex gap-x-2">
              <p>俺の地名</p>
              <p>{order.shizuyaAreaName} </p>
            </div>
            <div className="flex gap-x-2">
              <p>注文名</p>
              <p>{order.orderName} </p>
            </div>
            <div className="flex gap-x-2">
              <p>備考</p>
              <p>{order.orderRemark} </p>
            </div>
            <div className="flex gap-x-2">
              <p>予算</p>
              <p>{order.orderBudget} </p>
            </div>
            <div className="flex gap-x-2">
              <p>本当に届けてほしい</p>
              <p>{order.customInfoConfirm ? "はい" : "いいえ"}</p>
            </div>
            <div className="flex gap-x-2">
              <label>注文時刻</label>
              <p>{order.createdAt}</p>
            </div>
          </div>
          <div className="grid gap-y-5">
            <div className="flex gap-x-2">
              <label>ステータス</label>
              <select name="status" defaultValue={order.status}>
                {["INITIAL", "ACCEPTED", "DENIED", "PROGRESS", "COMPLETED"].map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-x-2">
              <label>コメント</label>
              <input name="comment" defaultValue={order.comment} />
            </div>
            <div className="flex gap-x-2">
              <label>到着予定時刻</label>
              <input type="datetime-local" name="estimatedArrivalTime" defaultValue={estimatedArrivalTime} />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-5 w-full h-16 rounded-full bg-red-300">
          更新
        </button>
        <button type="button" className="mt-5 w-full h-16 rounded-full bg-sky-300" onClick={() => onClickOrderCard("")}>
          閉じる
        </button>
      </form>
    </div>
  );
};
