"use client";

import { isDeliveryProcessStartAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
type Props = {};

export const DeliveryStartButton: FC<Props> = () => {
  const [isDeliveryProicessStart, setIsDeliveryProcessStart] = useAtom(
    isDeliveryProcessStartAtom
  );

  return (
    <div className="h-20 absolute bottom-8 w-full font-bold z-10 px-4">
      <button
        className={`w-full h-full text-2xl bg-red-500 text-gray-800 rounded-full ${
          isDeliveryProicessStart && "bg-gray-300"
        }`}
        onClick={() => setIsDeliveryProcessStart(true)}
        disabled={isDeliveryProicessStart}
      >
        デリバリーを開始する!
      </button>
    </div>
  );
};
