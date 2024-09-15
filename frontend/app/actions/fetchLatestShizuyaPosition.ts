"use server";

export const fetchLatestShizuyaPosition = async () => {
  try {
    const res = await fetch("http://api:3000/shizuya-positions", {
      cache: "no-store",
    });
    if (!res.ok) throw Error;

    return res.json();
  } catch {
    return null;
  }
};
