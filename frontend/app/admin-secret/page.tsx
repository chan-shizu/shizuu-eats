import { AdminOrder } from "@/types/order";
import { OrderList } from "./components/OrderList";
import { ShizuyaPosition } from "./components/ShizuyaPosition";
import { FC } from "react";

type Props = {
  searchParams: {
    pass: string;
  };
};

export const Page: FC<Props> = async ({ searchParams }) => {
  if (searchParams.pass !== process.env.ADMIN_PASSWORD) {
    return <p>勝手に入ってくるな！！</p>;
  }

  const ordersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/orders?password=${process.env.ADMIN_PASSWORD}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!ordersResponse.ok) return <p>ごめんなんかエラー起こった</p>;
  const orders: AdminOrder[] = await ordersResponse.json();

  return (
    <div className="p-5 grid gap-y-4">
      <h1 className=" text-3xl text-center mt-3">管理画面</h1>
      <ShizuyaPosition />
      <OrderList orders={orders} />
    </div>
  );
};

export default Page;
