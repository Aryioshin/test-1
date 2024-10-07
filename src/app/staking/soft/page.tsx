"use client";

import { useCallback, useEffect, useState } from "react";
import VolumeTable from "@/components/competition/VolumeTable";
import PrizeTable from "@/components/competition/PrizeTable";
import StakingView from "@/components/staking/StakingView";
import YourLockedValue from "@/components/staking/YourLockedValue";
import { getVolumes, volumeSort } from "@/utils/actions";
import { IVolume } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useAccount, useConfig } from "wagmi";
import { swapTokens, getQuote } from "@/utils/actions";
import { toast } from "react-toastify";
import { readContract, writeContract } from "@wagmi/core";
import { CONTRACT_ADDRESS } from "@/config/safeStakeConfig";
import { getUserInfo, getRewardRemain } from "@/utils/safeStakeActions";
import { deposit } from "@/utils/safeStakeActions";
import { Address } from "viem";
import { CloudCog } from "lucide-react";
import { config } from "@/config/config";
import { withdraw } from "@/utils/safeStakeActions";
import { claimRewards } from "@/utils/safeStakeActions";
import { Emerwithdraw } from "@/utils/safeStakeActions";
import Image from "next/image";
import { useSwitchChain, useChainId } from "wagmi";
import { base, cronos, cronosTestnet, mainnet } from "viem/chains";

export default function Page() {
  const router = useRouter();
  const [userVolume, setUserVolume] = useState<Array<IVolume>>([]);
  const [yourValue, setYourValue] = useState(0);
  const numberOfStaking = 2;
  // const config = useConfig();
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const config1 = useConfig();
  const [rewardRemainValue, setRewardRemainValue] = useState("");
  const chainId = useChainId();
  const { chains, switchChain, error } = useSwitchChain();

  const switchChainHandle = async () => {
    switchChain({ chainId: cronos.id });
  };

  console.log("asdf", chainId, cronos.id, chainId, cronosTestnet.id);

  useEffect(() => {
    const load = async () => {
      const res: any = await getUserInfo(config, address as Address);
      let [user_amount, user_reward] = res.toString().split(",");
      console.log("rererererrreer" + user_amount + "a" + user_reward);
      setYourValue(user_amount);
      setRewardRemainValue(user_reward);
      console.log("aaaaaaaaaaaa" + res);
    };
    if (address && config) {
      load();
    }
  }, [config, address]);

  // const newDeposit = (useCallback(async () => {
  //   if (baseToken == quoteToken) return;
  //   setIsSwapping(true);
  //   const res: boolean = await swapTokens(config, baseToken, quoteToken, baseAmount, address)
  //   if (res) {
  //     swapChange();
  //     toast.success("Transaction successfully finished");
  //   }
  //   setIsSwapping(false);
  // }, [baseAmount, address]))

  const handleAmountChange = (e: any) => {
    const value = e.target.value * Math.pow(10, 18);
    setAmount(value);
    console.log("chchchch:" + value);
  };

  const depositNew = () => {
    console.log("let's deposit");
    try {
      const res = deposit(config1, amount, CONTRACT_ADDRESS);
      console.log(amount, "mamamamam");
    } catch (error) {
      console.log("deposit Error!" + error);
    }
  };

  const withdrawFunc = () => {
    try {
      const res = withdraw(config1, CONTRACT_ADDRESS);
    } catch (error) {
      console.log("withdrawErr:", error);
    }
  };

  const EmerwithdrawFunc = () => {
    try {
      const res = Emerwithdraw(config1, CONTRACT_ADDRESS);
    } catch (error) {
      console.log("withdrawErr:", error);
    }
  };

  const allClaim = () => {
    try {
      const res = claimRewards(config1);
    } catch (error) {
      console.log("allClaim Err:", error);
    }
  };

  const showRemain = (rewardRemainValue: string) => {
    console.log("reward Remain -> " + rewardRemainValue);
    return rewardRemainValue;
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-green-200 pt-[100px]">
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
          <div
            className="text-3xl hover:cursor-pointer font-bold"
            onClick={() => {
              router.push("/staking");
            }}
          >
            STAKING
          </div>
        </div>

        {!(chainId != cronos.id && chainId != cronosTestnet.id) ? (
          <div className="">
            <div className="flex flex-row">
              <YourLockedValue value={yourValue} />
            </div>
            <div className="flex justify-center">
              <h1 className="text-orange-00 text-5xl text-center w-[129px] mt-[15px]">
                Input
              </h1>
              <input
                className="bg-transparent w-[80px] text-right focus:outline-2 outline-2 outline-green-1 font-bold mt-5 mx-10 text-5xl text-center px-3 h-12 z-20 text-orange-00"
                placeholder="0"
                // disabled={disabled}
                onChange={handleAmountChange}
              />
            </div>
            <div
              onClick={depositNew}
              className="relative text-3xl mr-10 hover:cursor-pointer font-medium text-orange-200 text-center z-10 mt-[50px] mb-[30px]"
            >
              Deposit
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => {
                  console.log("soft-all claimed!!!");
                }}
                type="button"
                className="flex justify-center items-center w-full mt-4 py-3 bg-green-1 rounded-xl hover:shadow-button hover:shadow-blue-400 tracking-widest"
              >
                <div
                  onClick={allClaim}
                  className="relative text-2xl font-medium text-orange-00 text-center z-10"
                >
                  Claim ( {showRemain(rewardRemainValue)} )
                </div>
              </button>

              <button
                onClick={() => {
                  console.log("soft-all claimed!!!");
                }}
                type="button"
                className="flex justify-center items-center  w-full mt-4 py-3 bg-green-1 rounded-xl hover:shadow-button hover:shadow-blue-400 tracking-widest"
              >
                <div
                  onClick={withdrawFunc}
                  className="relative text-2xl font-medium text-orange-00 text-center z-10"
                >
                  Withdraw
                </div>
              </button>
{/* 
              <button
                onClick={() => {
                  console.log("soft-all claimed!!!");
                }}
                type="button"
                className="flex justify-center items-center w-full mt-4 py-3 bg-green-1 rounded-xl hover:shadow-button hover:shadow-blue-400 tracking-widest"
              >
                <div
                  onClick={EmerwithdrawFunc}
                  className="relative text-2xl font-medium text-orange-00 text-center z-10"
                >
                  Emergency Withdraw
                </div>
              </button> */}
              <div className="flex items-center mt-12">
                {/* <input
                className="bg-transparent w-full text-right focus:outline-0 font-bold pr-2 text-5xl px-3 h-12 z-20 text-white"
                // value={amount ? amount : ""}
                placeholder="0"
                // disabled={disabled}
                // onChange={handleAmountChange}
              /> */}
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={switchChainHandle}
            className="flex justify-center items-center gap-4 w-full py-3 bg-green-600 text-xl rounded-xl hover:shadow-button hover:shadow-blue-400 hover:text-blue-400 text-orange-600 uppercase tracking-widest"
          >
            <div className="relative w-12 h-12">
              <Image src="/switch.png" fill alt="" />
            </div>
            Switch wallet
          </button>
        )}
      </div>
    </div>
  );

  // return <>hello</>;
}
