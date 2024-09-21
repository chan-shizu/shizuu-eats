import { ShizuyaPosition } from "./components/ShizuyaPosition";
import { FC } from "react";

type Props = {
  searchParams: {
    pass: string;
  };
};

export const Page: FC<Props> = ({ searchParams }) => {
  if (searchParams.pass !== process.env.ADMIN_PASSWORD) {
    return <p>勝手に入ってくるな！！</p>;
  }

  return (
    <div className="p-5 grid gap-y-4">
      <h1 className=" text-3xl text-center mt-3">管理画面</h1>
      <ShizuyaPosition />
    </div>
  );
};

export default Page;
