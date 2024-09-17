import { atom } from "jotai";

type DeliveryProcessStatusType = "initial" | "timeAndRoute" | "order" | "customerInfo" | "confirm";
export const deliveryProcessStatusAtom = atom<DeliveryProcessStatusType>("initial");
export const deliveryProcessPreviousStatusAtom = atom<DeliveryProcessStatusType>("initial");

export const currentUserPositionAtom = atom({
  lat: 35.69575,
  lng: 139.77521,
}); // 練馬らへん

export const distanceAndDurationAtom = atom({
  distance: "",
  walingkTime: "",
  bicyclingTime: "",
  driveTime: "",
});

export const orderAtom = atom({
  name: "",
  remark: "",
  budget: 0,
});

export const customerInfoAtom = atom({
  name: "",
  remark: "",
  confirm: false,
});
