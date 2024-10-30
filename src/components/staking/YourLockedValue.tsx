"use client";
import { formatEther } from "viem";

export default function YourLockedValue(props: any) {
  const { value } = props;

  const valueInt = parseFloat(formatEther(value)).toFixed(2);

  const test = valueInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <div className="flex justify-between w-[100%]">
      <div className="flex flex-col w-[45%] place-items-end justify-center px-2 py-8">
        <h1 className="text-orange-00 text-2xl text-center ">Value</h1>
      </div>
      <div className="flex flex-col w-[45%] place-items-start justify-center">
        <h1 className="text-orange-00 text-2xl text-center items-center my-6 animate-pulse drop-shadow-lg">
          {test}
        </h1>
      </div>
    </div>
  );
}
