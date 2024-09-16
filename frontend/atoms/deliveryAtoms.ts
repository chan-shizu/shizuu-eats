import { atom } from "jotai";

export const deliveryProcessStatusAtom = atom<"initial" | "timeAndRoute" | "order">("initial");
export const deliveryProcessPreviousStatusAtom = atom<"initial" | "timeAndRoute" | "order">("initial");

export const currentUserPositionAtom = atom({
  lat: 35.69575,
  lng: 139.77521,
}); // 練馬らへん

export const orderAtom = atom({
  name: "",
  remark: "",
  budget: 0,
});
