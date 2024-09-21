"use server";

export const fetchLatestShizuyaPosition = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/shizuya-positions`, {
      cache: "no-store",
    });
    if (!res.ok) throw Error;

    return res.json();
  } catch {
    return null;
  }
};
