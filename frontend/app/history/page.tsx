import { OrderList } from "./components/OrderList";
import { TopNavigation } from "@/components/TopNavigation";
import { FC } from "react";

type Props = {};

export const Page: FC<Props> = () => {
  return (
    <div className="">
      <TopNavigation />
      <div className="mt-[110px]">
        <OrderList />
      </div>
    </div>
  );
};

export default Page;
