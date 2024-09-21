"use server";

export const updateOrder = async (body: any) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_END_POINT + "/orders";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error();

    const orderId = await response.json();
    return orderId;
  } catch {
    return null;
  }
};
