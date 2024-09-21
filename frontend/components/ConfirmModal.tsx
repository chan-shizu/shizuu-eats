"use client";

import { createOrder } from "@/app/actions/createOrder";
import {
  currentUserPositionAtom,
  customerInfoAtom,
  deliveryProcessPreviousStatusAtom,
  deliveryProcessStatusAtom,
  distanceAndDurationAtom,
  orderAtom,
} from "@/atoms/deliveryAtoms";
import { LOCAL_STORAGE_ORDER_IDS_KEY } from "@/const";
import { useAtom, useAtomValue } from "jotai";
import { FC } from "react";
import toast from "react-hot-toast";

type Props = {};

export const ConfirmModal: FC<Props> = ({}) => {
  const [deliveryProcessStatus, setDeliveryProcessStatus] = useAtom(deliveryProcessStatusAtom);
  const [deliveryProcessPreviousStatus, setDeliveryPreviousProcessStatus] = useAtom(deliveryProcessPreviousStatusAtom);
  const distanceAndDuration = useAtomValue(distanceAndDurationAtom);
  const order = useAtomValue(orderAtom);
  const customerInfo = useAtomValue(customerInfoAtom);
  const currentUserPosition = useAtomValue(currentUserPositionAtom);

  const isModalOpen = deliveryProcessStatus === "confirm";

  const onClickBackButton = () => {
    setDeliveryProcessStatus("customerInfo");
    setDeliveryPreviousProcessStatus("confirm");
  };

  const onClickOrderButton = async () => {
    const orderId = await createOrder(distanceAndDuration, order, customerInfo, currentUserPosition);

    if (!orderId) {
      toast.error(
        <>
          エラーが発生しました((+_+))。
          <br /> 時間空けてもう一回やるか、直接僕に連絡ください！
        </>
      );
      return;
    }

    const jsonString = localStorage.getItem(LOCAL_STORAGE_ORDER_IDS_KEY);
    const orderIds = jsonString ? JSON.parse(jsonString) : [];
    localStorage.setItem("orderIds", JSON.stringify([...orderIds, orderId.id]));

    setDeliveryProcessStatus("initial");
    setDeliveryPreviousProcessStatus("initial");
    toast.success(
      <>
        注文が確定しました！
        <br />
        画面上部の履歴から、注文の状況を適時確認してください！
      </>
    );
  };

  if (deliveryProcessPreviousStatus !== "confirm" && deliveryProcessPreviousStatus !== "customerInfo") return <></>;

  return (
    <div
      className={`w-full h-full fixed inset-0 p-5 z-20 bg-white bg-opacity-80 ${
        isModalOpen ? "animate-slide-in" : "animate-slide-out "
      }`}
    >
      <div className={`bg-white z-10 w-full h-full p-5 relative`}>
        <h2 className="text-2xl">確認画面</h2>
        <div className="mt-4 text-sm">
          <p>入力内容に問題なかったら購入を確定ボタンを押してください！</p>
          <p>確定といいつつも、僕のスケジュールなどの都合で結構な割合でキャンセルになります。</p>
          <p>画面上部の履歴タブで今後の情報を確認してください</p>
          <p>また、別途各種SNSで僕から連絡があるかもです。</p>
        </div>
        <div className="grid gap-y-3 mt-6">
          <h3>距離と所要時間</h3>
          <ul className="mt-2 pl-4 text-2xl">
            <li>距離：{distanceAndDuration.distance}</li>
            <li>所要時間(徒歩)：{distanceAndDuration.walkingkTime}</li>
            <li>所要時間(自転車)：{distanceAndDuration.bicyclingTime}</li>
            <li>所要時間(車)：{distanceAndDuration.driveTime}</li>
          </ul>
        </div>
        <div className="grid gap-y-3 mt-6">
          <h3>注文情報</h3>
          <ul className="mt-2 pl-4 text-2xl">
            <li>購入物：{order.name}</li>
            <li>備考：{order.remark}</li>
            <li>予算：{order.budget}</li>
          </ul>
        </div>
        <div className="grid gap-y-3 mt-6">
          <h3>購入者情報</h3>
          <ul className="mt-2 pl-4 text-2xl">
            <li>名前：{customerInfo.name}</li>
            <li>備考：{customerInfo.remark}</li>
            <li>本当に買う？：{customerInfo.confirm ? "はい" : "いいえ"}</li>
          </ul>
        </div>
        <div className="grid gap-y-2 absolute bottom-5 left-0 w-full">
          <button className="w-full rounded-full h-20 bg-blue-400" onClick={onClickBackButton}>
            戻る
          </button>
          <button className="w-full rounded-full h-20 bg-red-400" onClick={onClickOrderButton}>
            注文を確定する
          </button>
        </div>
      </div>
    </div>
  );
};
