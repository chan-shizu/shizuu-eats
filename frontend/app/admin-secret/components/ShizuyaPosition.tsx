"use client";

import { createShizuyaPosition } from "@/app/admin-secret/actions/createShizuyaPosition";
import { useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";
type Props = {};

const getCurrentPositionAsync = () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const ShizuyaPosition: FC<Props> = () => {
  const searchParams = useSearchParams();

  const createShizuyaPositionByCurrentPosition = async () => {
    const password = searchParams.get("pass");
    if (!password) return;

    try {
      if (process.env.NODE_ENV === "development") {
        const res = await createShizuyaPosition(
          {
            lat: 35.6701 + Math.random() * 0.5 - 1,
            lng: 139.7025 + Math.random() * 0.5 - 1,
          },
          password
        );

        if (!res) throw Error;
      } else {
        const position = await getCurrentPositionAsync();

        const res = await createShizuyaPosition(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          password
        );

        if (!res) throw Error;
      }

      toast.success("作成に成功しました");
    } catch (error) {
      toast.error("エラーが発生しました");
    }
  };

  useEffect(() => {
    // 300000ミリ秒（300秒、5分）ごとにPOSTリクエストを実行
    const intervalId = setInterval(() => {
      createShizuyaPositionByCurrentPosition();
    }, 300000);
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 空の依存配列でコンポーネントの初回マウント時に実行

  return (
    <section>
      <h2 className="text-2xl">位置情報更新</h2>
      <button
        className="rounded-full bg-red-300 px-6 py-4 mt-3 mx-auto"
        onClick={createShizuyaPositionByCurrentPosition}
      >
        手動更新
      </button>
    </section>
  );
};
