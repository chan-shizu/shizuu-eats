"use server";

export const fetchLatestShizuyaPosition = async () => {
  try {
    const res = await fetch(`${process.env.API_END_POINT}/shizuya-positions`, {
      cache: "no-store",
    });
    if (!res.ok) throw Error;

    return res.json();
  } catch {
    return null;
  }
};
