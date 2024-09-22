"use server";

export const fetchOrder = async (orderId: string) => {
  try {
    const res = await fetch(`${process.env.API_END_POINT}/orders/${orderId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw Error;

    return res.json();
  } catch {
    return null;
  }
};
