"use client";

import { convertBignitToString } from "@/utils/safeStakeActions";
import { formatGwei, parseEther, parseGwei } from "viem";
import { formatEther } from 'viem';

export default function TotalLockedValue(props: any) {
  const { value } = props;

  const valueInt = parseFloat(formatEther(value)).toFixed(0);

  // const test1 : any = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // console.log(test1, "$%$%$%$%$");
  const test = convertBignitToString(valueInt);


  return (
    <div className="flex flex-col justify-center w-[100%]  px-2 py-8">
      <h1 className="text-orange-00 text-3xl text-center ">
        Total Locked Value
      </h1>
      <h1 className="text-orange-500 text-4xl text-center my-4 animate-pulse drop-shadow-lg">
        {test}
      </h1>
    </div>
  );
}
