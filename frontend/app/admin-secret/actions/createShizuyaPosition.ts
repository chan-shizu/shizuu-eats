"use server";

import { Position } from "@/atoms/deliveryAtoms";

export const createShizuyaPosition = async (position: Position, password: string) => {
  try {
    const url = process.env.API_END_POINT + "/shizuya-positions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: position.lat,
        longitude: position.lng,
        password: password,
      }),
    });

    if (!response.ok) throw new Error();

    return { message: "success" };
  } catch {
    return null;
  }
};
