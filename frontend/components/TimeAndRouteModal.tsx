"use client";

import { isDeliveryProcessStartAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";
import { FC } from "react";

type Props = {};

export const TimeAndRouterModal: FC<Props> = () => {
  const [isDeliveryProicessStart, setIsDeliveryProcessStart] = useAtom(
    isDeliveryProcessStartAtom
  );

  if (!isDeliveryProicessStart) return <></>;

  return (
    <div className="w-full h-full fixed inset-0 px-6 py-40 z-20 bg-white bg-opacity-40">
      <div className="bg-white z-10 w-full h-full bg-opacity-80"></div>
      test
    </div>
  );
};
