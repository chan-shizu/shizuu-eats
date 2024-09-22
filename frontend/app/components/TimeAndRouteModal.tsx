"use client";

import {
  currentShizuyaPositionAtom,
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
  const [currentUserPosition, setCurrentUserPosition] = useAtom(currentUserPositionAtom);
  const [currentShizuyaPosition, setCurrentShizuyaPosition] = useAtom(currentShizuyaPositionAtom);
  const [distanceAndDuration, setDistanceAndDuration] = useAtom(distanceAndDurationAtom);

  const isFirstRenderingRef = useRef(true);

  const isModalOpen = deliveryProcessStatus === "timeAndRoute";

  useEffect(() => {
    if (!isModalOpen) return;

    (async () => {
      const directionsService = new google.maps.DirectionsService();

      const tempDistanceAndDuration = {
        distance: "",
        walkingkTime: "",
        bicyclingTime: "",
        driveTime: "",
      };

      // ルートのリクエストを作成（歩き）
      await directionsService.route(
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
            tempDistanceAndDuration.walkingkTime = route.duration ? route.duration.text : "";
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      // ルートのリクエストを作成（自転車）
      await directionsService.route(
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
      await directionsService.route(
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
    })();

    (async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: currentUserPosition.lat, lng: currentUserPosition.lng } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            let areaName = "";
            if (results[0].address_components[results[0].address_components.length - 1].types.includes("postal_code")) {
              areaName =
                results[0].address_components[results[0].address_components.length - 3].long_name +
                results[0].address_components[results[0].address_components.length - 4].long_name;
            } else {
              areaName =
                results[0].address_components[results[0].address_components.length - 2].long_name +
                results[0].address_components[results[0].address_components.length - 3].long_name;
            }
            setCurrentUserPosition({
              ...currentUserPosition,
              areaName: areaName,
            });
          } else {
            console.error("Geocoder failed due to:", status);
          }
        }
      );
    })();

    (async () => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: latestShizuyaPosition.lat, lng: latestShizuyaPosition.lng } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            let areaName = "";
            if (results[0].address_components[results[0].address_components.length - 1].types.includes("postal_code")) {
              areaName =
                results[0].address_components[results[0].address_components.length - 3].long_name +
                results[0].address_components[results[0].address_components.length - 4].long_name;
            } else {
              areaName =
                results[0].address_components[results[0].address_components.length - 2].long_name +
                results[0].address_components[results[0].address_components.length - 3].long_name;
            }
            setCurrentShizuyaPosition({
              lat: latestShizuyaPosition.lat,
              lng: latestShizuyaPosition.lng,
              areaName: areaName,
            });
          } else {
            console.error("Geocoder failed due to:", status);
          }
        }
      );
    })();

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
      <div className="bg-white z-10 w-full h-full p-5 relative overflow-y-auto">
        <h2 className="text-3xl text-center">現在地情報</h2>
        <div className="mt-3">
          <p className="">現在地と現在地から計算された距離・所要時間です！</p>
          <p>位置情報取得してキモイよね！ごめん！</p>
          <p>
            あと、本当は公共交通機関での所要時間が出せると思ってたんだけどgoogle
            mapのその機能が日本でだけは使えないらしい！無念！
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl">現在地と距離</h3>
          <ul className="mt-2 grid gap-y-1 text-lg pl-4">
            <li>あなたの現在地：{currentUserPosition.areaName}周辺</li>
            <li>俺の現在地：{currentShizuyaPosition.areaName}周辺</li>
            <li>距離：{distanceAndDuration.distance}</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl">所要時間</h3>
          <ul className="mt-2 pl-4 text-lg grid gap-y-1">
            <li>徒歩：{distanceAndDuration.walkingkTime}</li>
            <li>自転車：{distanceAndDuration.bicyclingTime}</li>
            <li>車：{distanceAndDuration.driveTime}</li>
          </ul>
        </div>
        <div className="grid gap-y-4 w-full mt-7">
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
