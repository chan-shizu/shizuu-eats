"use server";

export const fetchLatestShizuyaPosition = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/shizuya-positions`, {
      cache: "no-store",
    });
    if (!res.ok) throw Error;

    return res.json();
  } catch {
    return {
      lat: 35.7072896,
      lng: 139.558912,
      createdAt: new Date().toISOString(),
    };
  }
};
