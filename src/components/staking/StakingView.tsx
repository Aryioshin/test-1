"use client";

import { useRouter } from "next/navigation";
import { format } from "path";
import { formatEther } from "viem";
import { formatUnits } from "viem";
const STAKING_TYPES = [
  { stakeMode: "Soft Stake", remainDay: 0 },
  { stakeMode: "Hard Stake", remainDay: 10 },
];

export default function StakigView(props: any) {
  const { id, percent, unlock, imme_fee } = props;
  const router = useRouter();

  const formatAPR = (val: any) => {
    return val / 100;
  };

  return (
    <div className="flex bg-green-700/30 relative rounded-2xl mt-12 mb-8">
      <div className="flex flex-col w-[40%] place-items-center justify-center px-2 py-5  bg-green-700/30 rounded-2xl">
        <h1 className="text-orange-200 text-4xl text-center my-4 font-semibold">
          {STAKING_TYPES[id].stakeMode}
        </h1>
        <div
          onClick={() => {
            if (id == 0) router.push("/staking/soft/");
            else router.push("/staking/hard/");
          }}
          className="hover:cursor-pointer"
        >
          <h1 className="text-orange-500 text-2xl  text-center my-4 pt-[20px]">
            Stake Now
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-[60%] items-center my-6 px-[5px] py-5">
        {unlock == 0 ? (
          <h1 className="text-orange-00 text-center text-3xl my-4">No locks</h1>
        ) : (
          <h1 className="text-orange-00 text-center text-3xl my-4">
            {unlock} day(s) to unlock
          </h1>
        )}
        <h1 className="text-orange-00 text-3xl my-4">
          {id == 0 ? formatUnits(percent, 2) : formatUnits(percent, 0)}% reward
        </h1>
        {id == 1 ? (
          <h1 className="text-orange-00 text-2xl my-4 px-8">
            Immediate withdrawal {imme_fee}% FEE
          </h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
