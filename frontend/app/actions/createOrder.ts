"use server";

import { CustomerInfo, DistanceAndDuration, Order } from "@/atoms/deliveryAtoms";

export const createOrder = async (
  distanceAndDuration: DistanceAndDuration,
  order: Order,
  customerInfo: CustomerInfo
) => {
  console.log("create order");
  try {
    const url = process.env.API_END_POINT + "/orders";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        distance: distanceAndDuration.distance,
        walkingTime: distanceAndDuration.walkingkTime,
        bicyclingTime: distanceAndDuration.bicyclingTime,
        driveTime: distanceAndDuration.driveTime,
        orderName: order.name,
        orderRemark: order.remark,
        orderBudget: order.budget,
        customInfoName: customerInfo.name,
        customInfoRemark: customerInfo.name,
        customInfoConfirm: customerInfo.confirm,
      }),
    });

    if (!response.ok) throw new Error();

    const orderId = await response.json();
    return orderId;
  } catch {
    return null;
  }
};
