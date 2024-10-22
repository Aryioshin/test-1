"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

function TopBar() {
  const openBridge = () => {
    window.open("https://ary-frontend.vercel.app/",  "_blank");
  };

  return (
    <div className="flex w-full fixed justify-between items-center px-8 py-2 z-50">
      <div className="flex justify-center rounded-full w-32 h-32 bg-green-700/50 backdrop-blur-sm border-8 border-green-500">
        <div className="relative h-full aspect-[680/517] ">
          <Image className="scale-125" src="/logo.png" fill alt="" />
        </div>
      </div>
      <div className="flex gap-8">
        <button
          onClick={openBridge}
          className="bg-blue-600 h-[40px] w-[80px] rounded-xl text-white font-semibold py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Bridge
        </button>
        <div className="h-8">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
