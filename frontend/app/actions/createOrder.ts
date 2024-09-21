"use server";

import { CustomerInfo, DistanceAndDuration, Order, Position, PositionWithAreaName } from "@/atoms/deliveryAtoms";

export const createOrder = async (
  distanceAndDuration: DistanceAndDuration,
  order: Order,
  customerInfo: CustomerInfo,
  currentUserPosition: PositionWithAreaName,
  currentShizuyaPosition: PositionWithAreaName
) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_END_POINT + "/orders";
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
        customerLatitude: currentUserPosition.lat,
        customerLongitude: currentUserPosition.lng,
        customerAreaName: currentUserPosition.areaName,
        shizuyaLatitude: currentShizuyaPosition.lat,
        shizuyaLongitude: currentShizuyaPosition.lng,
        shizuyaAreaName: currentShizuyaPosition.areaName,
      }),
    });

    if (!response.ok) throw new Error();

    const orderId = await response.json();
    return orderId;
  } catch {
    return null;
  }
};
