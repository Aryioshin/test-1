"use client";
import { useEffect, useState } from "react";
import { Address, formatUnits } from "viem";
import VolumeTable from "@/components/competition/VolumeTable";
import PrizeTable from "@/components/competition/PrizeTable";
import StakingView from "@/components/staking/StakingView";
import TotalLockedValue from "@/components/staking/TotalLockedValue";
import { getVolumes, volumeSort } from "@/utils/actions";
import { IVolume } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { CONTRACT_ADDRESS } from "@/config/safeStakeConfig";
import { useAccount, useConfig } from "wagmi";
import { getHardRate, getHardTotalStaked, getHardUnlock, getImmeFee, getSoftUnlock, getTotalStaked } from "@/utils/safeStakeActions";
import { getSoftAPR } from "@/utils/safeStakeActions";
import { CONTRACT_ADDRESS_HARD } from "@/config/safeStakeConfig";

export default function Page() {
  const router = useRouter();
  const [userVolume, setUserVolume] = useState<Array<IVolume>>([]);
  const numberOfStaking = 2;
  const [totalValue, setTotalValue] = useState<number | any>(0);
  const [softPercent, setSoftPercent] = useState<number | any>(0);
  const [hardPercent, setHardPercent] = useState<number | any>(0);
  const [softUnlock, setSoftUnlock] = useState<number | any>(0);
  const [hardUnlock, setHardUnlock] = useState<number | any>(0);
  const [immeFee, setImmeFee] = useState<number | any>(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res: any = await getTotalStaked();
        const res_hard: any = await getHardTotalStaked();
        console.log(res+res_hard, "============>");
        const totalRes = res + res_hard;
        setTotalValue(totalRes);
      } catch (error) {
        console.log("Error fetching total staked", error);
      }
    };
    load();
  }, [setTotalValue]);

  useEffect(() => {
    const load = async () => {
      try {
        const res: any = await getSoftAPR();
        const res_hard: any = await getHardRate();
        const res_1: any = await getSoftUnlock();
        const res_2: any = await getHardUnlock();
        const res_3: any = await getImmeFee();
        console.log(res, "sofTARf---------")
        setSoftPercent(res);
        setHardPercent(res_hard);

        const r = formatUnits(res_1, 0);
        setSoftUnlock(r);
        const r1 : any = formatUnits(res_2, 0);
        setHardUnlock((r1 / 3600 / 24).toFixed(0));
        const rr : any = formatUnits(res_3, 0);
        setImmeFee(rr);
        console.log(" ", res_3);
      } catch (error) {
        console.log("Error fetching total staked", error);
      }
    };
    load();
  }, [setSoftPercent, setHardPercent, setSoftUnlock, setHardUnlock, setImmeFee]);

  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-green-200 sm:pt-[100px] pt-[350px]">
      <div className="relative w-[calc(100%-10px)] md:w-[700px] bg-green-950/80 px-5 pt-10 pb-4 mx-4 shadow-3xl shadow-green-600/70 rounded-3xl backdrop-blur-sm">
        <div className="flex justify-between items-baseline mb-4 px-8">
          <div
            className="text-2xl text-gray-400 hover:text-blue-400 hover:cursor-pointer hover:scale-125 hover:bottom-4 bottom-0 transition-all duration-100"
            onClick={() => {
              router.push("/swap");
            }}
          >
            SWAP
          </div>
          <div
            className="text-2xl text-gray-400 hover:text-blue-400 hover:cursor-pointer hover:scale-125 hover:bottom-4 bottom-0 transition-all duration-100"
            onClick={() => {
              router.push("/competition");
            }}
          >
            BATTLE
          </div>
          <div className="text-3xl hover:cursor-pointer font-bold">STAKING</div>
        </div>

        <TotalLockedValue value={totalValue} />
        <div className="">
          {/* {Array.from({ length: numberOfStaking }, (_, index) => (
            <StakingView key={index} id={index} percent = {softPercent} />
          ))} */}
            <StakingView id={0} percent = {softPercent} unlock = {softUnlock} imme_fee = {immeFee}/>
            <StakingView id={1} percent = {25} unlock = {hardUnlock} imme_fee = {immeFee}/>

          {/* <div className="flex bg-green-700/30 relative rounded-2xl mt-12 mb-8">
            <div className="flex flex-col w-[40%]  px-2 py-5  bg-green-700/30 rounded-2xl">
              <h1 className="text-orange-200 text-4xl text-center my-4 font-semibold">
                Hard Stake
              </h1>
            </div>
            <div className="flex flex-col w-[60%] items-center my-6 px-[80px] py-5">
              <h1 className="text-orange-00 text-2xl my-4">Coming soon</h1>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
