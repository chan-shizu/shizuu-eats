import { atom } from "jotai";

export type DeliveryProcessStatusType = "initial" | "timeAndRoute" | "order" | "customerInfo" | "confirm";
export type DistanceAndDuration = {
  distance: string;
  walkingkTime: string;
  bicyclingTime: string;
  driveTime: string;
};
export type Order = {
  name: string;
  remark: string;
  budget: number;
};
export type CustomerInfo = {
  name: string;
  remark: string;
  confirm: boolean;
};
export type Position = {
  lat: number;
  lng: number;
};
export type PositionWithAreaName = {
  lat: number;
  lng: number;
  areaName: string;
};

export const deliveryProcessStatusAtom = atom<DeliveryProcessStatusType>("initial");
export const deliveryProcessPreviousStatusAtom = atom<DeliveryProcessStatusType>("initial");

export const currentUserPositionAtom = atom({
  lat: 35.69575,
  lng: 139.77521,
  areaName: "",
}); // 練馬らへん

export const currentShizuyaPositionAtom = atom({
  lat: 0,
  lng: 0,
  areaName: "",
}); // 練馬らへん

export const distanceAndDurationAtom = atom<DistanceAndDuration>({
  distance: "",
  walkingkTime: "",
  bicyclingTime: "",
  driveTime: "",
});

export const orderAtom = atom<Order>({
  name: "",
  remark: "",
  budget: 0,
});

export const customerInfoAtom = atom<CustomerInfo>({
  name: "",
  remark: "",
  confirm: false,
});
