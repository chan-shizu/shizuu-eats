"use client";

import { customerInfoAtom, deliveryProcessPreviousStatusAtom, deliveryProcessStatusAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";
import { FC } from "react";

type Props = {};

export const CustomerInfoModal: FC<Props> = ({}) => {
  const [deliveryProcessStatus, setDeliveryProcessStatus] = useAtom(deliveryProcessStatusAtom);
  const [deliveryProcessPreviousStatus, setDeliveryPreviousProcessStatus] = useAtom(deliveryProcessPreviousStatusAtom);
  const [customerInfo, setCustomerInfo] = useAtom(customerInfoAtom);

  const isModalOpen = deliveryProcessStatus === "customerInfo";

  const onClickBackButton = () => {
    setDeliveryProcessStatus("order");
    setDeliveryPreviousProcessStatus("customerInfo");
  };

  const onClickNextButton = () => {
    setDeliveryProcessStatus("confirm");
    setDeliveryPreviousProcessStatus("customerInfo");
  };

  if (
    deliveryProcessPreviousStatus !== "order" &&
    deliveryProcessPreviousStatus !== "customerInfo" &&
    deliveryProcessPreviousStatus !== "confirm"
  ) {
    return <></>;
  }

  return (
    <div
      className={`w-full h-full fixed inset-0 p-5 z-20 bg-white bg-opacity-80 ${
        isModalOpen ? "animate-slide-in" : "animate-slide-out "
      }`}
    >
      <div className="bg-white z-10 w-full h-full p-5 relative overflow-y-auto">
        <h2 className="text-3xl text-center">お客さま情報</h2>
        <div className="mt-4">
          <p>セキュリティも何もないので、最悪流出しても良い情報でおねがいします</p>
        </div>
        <div className="grid gap-y-6 mt-6">
          <div>
            <label htmlFor="customer_name" className="block mb-2 text-sm font-medium text-gray-900">
              名前(フルネームじゃなくて良いですが、俺が誰だか分かるようにおねがいします！)
            </label>
            <input
              type="text"
              id="item_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="たなか、こうちゃん...etc"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="item_remark" className="block mb-2 text-sm font-medium text-gray-900">
              受け渡し方法などなにかあれば
            </label>
            <textarea
              id="item_remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="所沢駅に16時ごろでおねがいします、明日でもよいよ"
              value={customerInfo.remark}
              onChange={(e) => setCustomerInfo({ ...customerInfo, remark: e.target.value })}
            />
          </div>
          <div>
            <div className="bg-gray-100 p-4 text-sm rounded-xl ">
              <p>スケジュールが空いてれば、マジで届けにいくつもりです。</p>
              <p>本当に届けてほしい方はチェックお願いします。</p>
              <p>試しに送ってみたいだけの方はチェックしないで次の画面に進んでください。</p>
            </div>
            <div className="flex items-center h-5 mt-5 justify-center gap-x-3">
              <input
                id="remember"
                type="checkbox"
                checked={customerInfo.confirm}
                onChange={(e) => setCustomerInfo({ ...customerInfo, confirm: e.target.checked })}
                className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                マジで来てほしいです
              </label>
            </div>
          </div>
        </div>
        <div className="grid gap-y-4 w-full mt-5">
          <button className="w-full rounded-full h-20 bg-blue-400" onClick={onClickBackButton}>
            戻る
          </button>
          <button className="w-full rounded-full h-20 bg-red-400" onClick={onClickNextButton}>
            確認画面に進む
          </button>
        </div>
      </div>
    </div>
  );
};
