"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
type Props = {};

export const TopNavigation: FC<Props> = () => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="h-28 absolute top-0 grid grid-cols-2 w-full bg-white bg-opacity-70 text-2xl font-bold text-gray-600 z-10 border-b-2 border-gray-400">
      <button
        className={`${currentPath == "/" && "  bg-gray-200 text-black shadow"}`}
        onClick={() => router.push("/")}
      >
        注文
      </button>
      <button
        className={`${
          currentPath == "/history" && " bg-gray-200 text-black shadow"
        }`}
        onClick={() => router.push("history")}
      >
        履歴
      </button>
    </div>
  );
};
