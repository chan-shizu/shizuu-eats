"use client";

import {
  currentUserPositionAtom,
  deliveryProcessPreviousStatusAtom,
  deliveryProcessStatusAtom,
  distanceAndDurationAtom,
} from "@/atoms/deliveryAtoms";
import { LatestShizuyaPosition } from "@/types/latestShizuyasPosition";
import { useLoadScript } from "@react-google-maps/api";
import { useAtom, useAtomValue } from "jotai";
import { FC, useEffect, useRef, useState } from "react";

type Props = { latestShizuyaPosition: LatestShizuyaPosition };

export const TimeAndRouterModal: FC<Props> = ({ latestShizuyaPosition }) => {
  const [deliveryProcessStatus, setDeliveryProcessStatus] = useAtom(deliveryProcessStatusAtom);
  const [deliveryProcessPreviousStatus, setDeliveryPreviousProcessStatus] = useAtom(deliveryProcessPreviousStatusAtom);
  const currentUserPosition = useAtomValue(currentUserPositionAtom);
  const [distanceAndDuration, setDistanceAndDuration] = useAtom(distanceAndDurationAtom);

  const isFirstRenderingRef = useRef(true);

  const isModalOpen = deliveryProcessStatus === "timeAndRoute";

  useEffect(() => {
    if (!isModalOpen) return;

    const directionsService = new google.maps.DirectionsService();

    const tempDistanceAndDuration = {
      distance: "",
      walingkTime: "",
      bicyclingTime: "",
      driveTime: "",
    };

    // ルートのリクエストを作成（歩き）
    directionsService.route(
      {
        origin: new google.maps.LatLng(latestShizuyaPosition.lat, latestShizuyaPosition.lng),
        destination: new google.maps.LatLng(currentUserPosition.lat, currentUserPosition.lng),
        travelMode: google.maps.TravelMode.WALKING, // WALKING, BICYCLING, DRIVINGなどが使用可能。TRANSITは日本国内では使えないらしい😢
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result !== null) {
          // 経路の距離と所要時間を取得
          const route = result.routes[0].legs[0];
          tempDistanceAndDuration.distance = route.distance ? route.distance.text : "";
          tempDistanceAndDuration.walingkTime = route.duration ? route.duration.text : "";
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    // ルートのリクエストを作成（自転車）
    directionsService.route(
      {
        origin: new google.maps.LatLng(latestShizuyaPosition.lat, latestShizuyaPosition.lng),
        destination: new google.maps.LatLng(currentUserPosition.lat, currentUserPosition.lng),
        travelMode: google.maps.TravelMode.BICYCLING, // WALKING, BICYCLING, DRIVINGなどが使用可能。TRANSITは日本国内では使えないらしい😢
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result !== null) {
          // 経路の距離と所要時間を取得
          const route = result.routes[0].legs[0];
          tempDistanceAndDuration.bicyclingTime = route.duration ? route.duration.text : "";
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    // ルートのリクエストを作成（車）
    directionsService.route(
      {
        origin: new google.maps.LatLng(latestShizuyaPosition.lat, latestShizuyaPosition.lng),
        destination: new google.maps.LatLng(currentUserPosition.lat, currentUserPosition.lng),
        travelMode: google.maps.TravelMode.DRIVING, // WALKING, BICYCLING, DRIVINGなどが使用可能。TRANSITは日本国内では使えないらしい😢
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result !== null) {
          // 経路の距離と所要時間を取得
          const route = result.routes[0].legs[0];
          tempDistanceAndDuration.driveTime = route.duration ? route.duration.text : "";
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    setDistanceAndDuration(tempDistanceAndDuration);

    if (isFirstRenderingRef.current) {
      isFirstRenderingRef.current = false;
    }
  }, [deliveryProcessStatus]);

  if (isFirstRenderingRef.current) return <></>;

  const onClickBackButton = () => {
    setDeliveryProcessStatus("initial");
    setDeliveryPreviousProcessStatus("timeAndRoute");
  };

  const onClickNextButton = () => {
    setDeliveryProcessStatus("order");
    setDeliveryPreviousProcessStatus("timeAndRoute");
  };

  if (
    isFirstRenderingRef.current &&
    deliveryProcessPreviousStatus !== "initial" &&
    deliveryProcessPreviousStatus !== "timeAndRoute" &&
    deliveryProcessPreviousStatus !== "order"
  ) {
    return <></>;
  }

  return (
    <div
      className={`w-full h-full fixed inset-0 p-5 z-20 bg-white bg-opacity-80 ${
        isModalOpen ? "animate-slide-in" : "animate-slide-out "
      }`}
    >
      <div className={`bg-white z-10 w-full h-full p-5 relative `}>
        <h2 className=" text-xl">現在地から計算された所要時間は以下のようになります</h2>
        <div className="mt-4">
          <h3 className="text-4xl">距離</h3>
          <p className="text-2xl mt-2 pl-4">およそ {distanceAndDuration.distance}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-4xl">所要時間</h3>
          <ul className="mt-2 pl-4 text-2xl">
            <li>徒歩：{distanceAndDuration.walingkTime}</li>
            <li>自転車：{distanceAndDuration.bicyclingTime}</li>
            <li>車：{distanceAndDuration.driveTime}</li>
          </ul>
        </div>
        <div className="grid gap-y-2 absolute bottom-5 left-0 w-full">
          <button className="w-full rounded-full h-20 bg-blue-400" onClick={onClickBackButton}>
            戻る
          </button>
          <button className="w-full rounded-full h-20 bg-red-400" onClick={onClickNextButton}>
            注文内容に進む
          </button>
        </div>
      </div>
    </div>
  );
};
