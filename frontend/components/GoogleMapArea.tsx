"use client";

import { FC, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, useLoadScript } from "@react-google-maps/api";
import { LatestShizuyaPosition } from "@/types/latestShizuyasPosition";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// 練馬らへん
const defaultCenter = {
  lat: 35.69575,
  lng: 139.77521,
};

const MOVE_DURATION = 5000; // 移動にかかる時間 (ミリ秒)
const MOVE_INTERVAL = 50; // マーカーの位置を更新する時間 (ミリ秒)

type Props = { latestShizuyaPosition: LatestShizuyaPosition };

export const GoogleMapArea: FC<Props> = ({ latestShizuyaPosition }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [shizuyaMarkerPosition, setShizuyaMarkerPosition] = useState({
    lat: latestShizuyaPosition.lat,
    lng: latestShizuyaPosition.lng,
  });

  // 初回ローディング時にユーザーの位置情報を取得
  useEffect(() => {
    const tempCurrentPosition = { ...defaultCenter };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          tempCurrentPosition.lat = position.coords.latitude;
          tempCurrentPosition.lng = position.coords.longitude;
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
      bounds.extend(currentPosition);

      // マップのズームレベルを自動調整
      mapRef.current.fitBounds(bounds);
    }
  }, [currentPosition]);

  const googleMapOnLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  // デリバリーが開始したらマーカーを動かす
  useEffect(() => {
    const intervalId = setInterval(() => {
      // moveMarker();
      const latDiff = ((currentPosition.lat - latestShizuyaPosition.lat) / MOVE_DURATION) * MOVE_INTERVAL; // 移動量 (緯度)
      const lngDiff = ((currentPosition.lng - latestShizuyaPosition.lng) / MOVE_DURATION) * MOVE_INTERVAL; // 移動量 (経度)

      setShizuyaMarkerPosition((prevPosition) => {
        const newLat = prevPosition.lat + latDiff;
        const newLng = prevPosition.lng + lngDiff;

        // 目的地に近づいているかを確認
        if (Math.abs(newLat - currentPosition.lat) < 0.001 && Math.abs(newLng - currentPosition.lng) < 0.001) {
          return {
            lat: latestShizuyaPosition.lat,
            lng: latestShizuyaPosition.lng,
          }; // 目的地に到達したら更新を停止
        }
        return { lat: newLat, lng: newLng };
      });
    }, MOVE_INTERVAL); // 0.1秒ごとに更新

    return () => clearInterval(intervalId); // クリーンアップ
  });

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}>
        <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={17} onLoad={googleMapOnLoad}>
          {typeof google !== "undefined" && (
            <>
              <Marker
                key={"shizuya-position"}
                position={{
                  lat: shizuyaMarkerPosition.lat,
                  lng: shizuyaMarkerPosition.lng,
                }}
                icon={{
                  url: "google_map_marker_me.png",
                  scaledSize: new google.maps.Size(50, 75),
                }}
              />
              <Marker
                key={"user-position"}
                position={currentPosition}
                icon={{
                  url: "google_map_marker_you.png",
                  scaledSize: new google.maps.Size(75, 75),
                }}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
