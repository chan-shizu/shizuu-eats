"use client";

import { deliveryProcessPreviousStatusAtom, deliveryProcessStatusAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
type Props = {};

export const DeliveryStartButton: FC<Props> = () => {
  const [deliveryProcessStatus, setDeliveryProcessStatus] = useAtom(deliveryProcessStatusAtom);
  const [deliveryProcessPreviousStatus, setDeliveryPreviousProcessStatus] = useAtom(deliveryProcessPreviousStatusAtom);

  const isButtonActive = deliveryProcessStatus === "initial";

  const onClickButton = () => {
    setDeliveryProcessStatus("timeAndRoute");
    setDeliveryPreviousProcessStatus("initial");
  };

  return (
    <div className="h-20 absolute bottom-8 w-full font-bold z-10 px-4">
      <button
        className={`w-full h-full text-2xl bg-red-500 text-gray-800 rounded-full ${!isButtonActive && "bg-gray-300"}`}
        onClick={onClickButton}
        disabled={!isButtonActive}
      >
        デリバリーを開始する!
      </button>
    </div>
  );
};
