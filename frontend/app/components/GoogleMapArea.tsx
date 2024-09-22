"use client";

import { FC, useEffect, useRef, useState } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { LatestShizuyaPosition } from "@/types/latestShizuyasPosition";
import { currentUserPositionAtom } from "@/atoms/deliveryAtoms";
import { useAtom } from "jotai";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// 練馬らへん
const defaultCenter = {
  lat: 35.69575,
  lng: 139.77521,
};

const MOVE_DURATION = 10000; // 移動にかかる時間 (ミリ秒)
const MOVE_INTERVAL = 100; // マーカーの位置を更新する時間 (ミリ秒)

type Props = { latestShizuyaPosition: LatestShizuyaPosition };

export const GoogleMapArea: FC<Props> = ({ latestShizuyaPosition }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentUserPosition, setCurrentUserPosition] = useAtom(currentUserPositionAtom);
  const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(null);

  // 初回ローディング時にユーザーの位置情報を取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentUserPosition({
            ...currentUserPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // ルートのリクエストを作成
          if (!google) return;
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: new google.maps.LatLng(latestShizuyaPosition.lat, latestShizuyaPosition.lng),
              destination: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              travelMode: google.maps.TravelMode.WALKING, // 他に WALKING, BICYCLING, TRANSIT も使用可能
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result !== null) {
                setDirectionResponse(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        },
        () => {
          console.error("Error fetching geolocation");
        }
      );
    }
  }, []);

  // 2点のマーカーが画面に入るようにズームレベル調整
  useEffect(() => {
    if (mapRef.current) {
      const bounds = new google.maps.LatLngBounds();

      bounds.extend(new google.maps.LatLng(latestShizuyaPosition.lat, latestShizuyaPosition.lng));
      bounds.extend(currentUserPosition);

      // マップのズームレベルを自動調整
      mapRef.current.fitBounds(bounds);
    }
  }, [currentUserPosition]);

  const googleMapOnLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // デリバリーが開始したらマーカーを動かす
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // moveMarker();
  //     const latDiff = ((currentUserPosition.lat - latestShizuyaPosition.lat) / MOVE_DURATION) * MOVE_INTERVAL; // 移動量 (緯度)
  //     const lngDiff = ((currentUserPosition.lng - latestShizuyaPosition.lng) / MOVE_DURATION) * MOVE_INTERVAL; // 移動量 (経度)

  //     setShizuyaMarkerPosition((prevPosition) => {
  //       const newLat = prevPosition.lat + latDiff;
  //       const newLng = prevPosition.lng + lngDiff;

  //       // 目的地に近づいているかを確認
  //       if (Math.abs(newLat - currentUserPosition.lat) < 0.001 && Math.abs(newLng - currentUserPosition.lng) < 0.001) {
  //         return {
  //           lat: latestShizuyaPosition.lat,
  //           lng: latestShizuyaPosition.lng,
  //         }; // 目的地に到達したら更新を停止
  //       }
  //       return { lat: newLat, lng: newLng };
  //     });
  //   }, MOVE_INTERVAL);
  //   return () => clearInterval(intervalId); // クリーンアップ
  // });

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentUserPosition} zoom={17} onLoad={googleMapOnLoad}>
          {typeof google !== "undefined" && (
            <>
              <Marker
                key={"shizuya-position"}
                position={{
                  lat: latestShizuyaPosition.lat,
                  lng: latestShizuyaPosition.lng,
                }}
                icon={{
                  url: "google_map_marker_me.png",
                  scaledSize: new google.maps.Size(50, 75),
                }}
              />
              <Marker
                key={"user-position"}
                position={currentUserPosition}
                icon={{
                  url: "google_map_marker_you.png",
                  scaledSize: new google.maps.Size(75, 75),
                }}
              />

              {/* DirectionsRenderer to render the route with custom styling */}
              {directionResponse && (
                <DirectionsRenderer
                  options={{
                    directions: directionResponse,
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#ff4500", // 線の色
                      strokeOpacity: 0.7, // 不透明度
                      strokeWeight: 6, // 太さ
                    },
                  }}
                />
              )}
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
