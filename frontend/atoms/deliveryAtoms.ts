import { atom } from "jotai";

export const isDeliveryProcessStartAtom = atom(false);

export const currentUserPositionAtom = atom({
  lat: 35.69575,
  lng: 139.77521,
}); // 練馬らへん
