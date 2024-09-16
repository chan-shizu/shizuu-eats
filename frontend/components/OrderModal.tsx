"use client";

import { deliveryProcessPreviousStatusAtom, deliveryProcessStatusAtom, orderAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";
import { FC } from "react";

type Props = {};

export const OrderModal: FC<Props> = ({}) => {
  const [deliveryProcessStatus, setDeliveryProcessStatus] = useAtom(deliveryProcessStatusAtom);
  const [deliveryProcessPreviousStatus, setDeliveryPreviousProcessStatus] = useAtom(deliveryProcessPreviousStatusAtom);
  const [order, setOrder] = useAtom(orderAtom);

  const isModalOpen = deliveryProcessStatus === "order";

  const onClickBackButton = () => {
    setDeliveryProcessStatus("timeAndRoute");
    setDeliveryPreviousProcessStatus("order");
  };

  const onClickNextButton = () => {
    setDeliveryProcessStatus("next");
    setDeliveryPreviousProcessStatus("order");
  };

  if (deliveryProcessPreviousStatus !== "timeAndRoute" && deliveryProcessPreviousStatus !== "order") return <></>;

  return (
    <div
      className={`w-full h-full fixed inset-0 p-5 z-20 bg-white bg-opacity-80 ${
        isModalOpen ? "animate-slide-in" : "animate-slide-out "
      }`}
    >
      <div className={`bg-white z-10 w-full h-full p-5 relative`}>
        <h2 className="text-2xl">注文内容をご入力ください</h2>
        <div className="mt-4">
          <p>指定してもらった範囲で、僕のセンスで買い物してきます!</p>
          <p>別に買い物じゃなくても、送迎とか遊びの誘いとかなんでも対応可能です!</p>
        </div>
        <div className="grid gap-y-6 mt-6">
          <div>
            <label htmlFor="item_name" className="block mb-2 text-sm font-medium text-gray-900">
              買ってきてほしいもの、頼み事
            </label>
            <input
              type="text"
              id="item_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="マックのポテト、来てくれるだけでいいよ、...etc"
              value={order.name}
              onChange={(e) => setOrder({ ...order, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="item_remark" className="block mb-2 text-sm font-medium text-gray-900">
              備考
            </label>
            <textarea
              id="item_remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="揚げたてがよいです、車で送迎してほしいです...etc"
              value={order.remark}
              onChange={(e) => setOrder({ ...order, remark: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="item_budget" className="block mb-2 text-sm font-medium text-gray-900">
              予算(交通費は僕負担ですが、買い物代はおねがいします！)
            </label>
            <input
              type="number"
              id="item_budget"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="2000円"
              value={order.budget}
              onChange={(e) => setOrder({ ...order, budget: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid gap-y-2 absolute bottom-5 left-0 w-full">
          <button className="w-full rounded-full h-20 bg-blue-400" onClick={onClickBackButton}>
            戻る
          </button>
          <button className="w-full rounded-full h-20 bg-red-400" onClick={onClickNextButton}>
            進む
          </button>
        </div>
      </div>
    </div>
  );
};
