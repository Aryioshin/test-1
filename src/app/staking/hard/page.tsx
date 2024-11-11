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
import {
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_HARD,
} from "@/config/safeStakeConfig";
import {
  getUserInfo,
  getRewardRemain,
  getUserInfoHard,
  claimRewardsHard,
  withdrawHard,
  depositHard,
  getUserVolumeHard,
  convertBignitToString
} from "@/utils/safeStakeActions";
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
import { getTokenBalance } from "@/utils/actions";
import { formatEther } from "viem";

export default function Page() {
  const router = useRouter();
  const [userVolume, setUserVolume] = useState<Array<IVolume>>([]);
  const [yourValue, setYourValue] = useState(0);
  const numberOfStaking = 2;
  // const config = useConfig();
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const [showAmount, setShowAmount] = useState(0);
  const config1 = useConfig();
  const [rewardRemainValue, setRewardRemainValue] = useState("");
  const chainId = useChainId();
  const { chains, switchChain, error } = useSwitchChain();
  const [tooltipFlg, setToolTipFlg] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [maxDeposit, setMaxDeposit] = useState(0);

  const switchChainHandle = async () => {
    switchChain({ chainId: cronos.id });
  };

  console.log("asdf", chainId, cronos.id, chainId, cronosTestnet.id);

  useEffect(() => {
    const load = async () => {
      const res: any = await getUserInfoHard(config, address as Address);
      // let [user_amount, user_reward] = res.toString().split(",");
      console.log("rererererrreer" + res[0] + "a" + res[1]);
      const balance: any = await getTokenBalance(
        config,
        address as Address,
        chainId,
        2
      );
      const test: any = balance
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTotalBalance(test);
      setYourValue(res[0]);
      setRewardRemainValue(res[1].toString());
      let maxDepo: any = await getUserVolumeHard(config, address as Address);
      let r : any = parseFloat(maxDepo);
      console.log(r, "rrrrrrrrrrrrr");
      const r1 : any = parseFloat(formatEther(res[0]));
      console.log(r1, "resresres");
      if(r1 > 0) r -= r1;
      setMaxDeposit(r);
      // console.log("aaaaaaaaaaaa" + res);
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
    setShowAmount(e.target.value);
    console.log("chchchch:" + value);
  };

  const formatNumbertoLetter = (n: any) => {
    const num = parseFloat(n.toString().replace(/,/g, ""));
    const oneK = 100000,
      oneM = 1000 * oneK;
    console.log("FormatF", num / oneK, oneM);
    if (num < 100000000) return num;
    if (num < oneM) {
      return num / oneK + 'K';
    }
    return num / oneM + 'M';
  };

  const depositNew = () => {
    console.log("let's deposit");
    try {
      const res = depositHard(config1, amount, CONTRACT_ADDRESS_HARD);
      console.log(amount, "mamamamam");
    } catch (error) {
      console.log("deposit Error!" + error);
    }
  };

  const withdrawFunc = () => {
    try {
      const res = withdrawHard(config1, CONTRACT_ADDRESS_HARD);
    } catch (error) {
      console.log("withdrawErr:", error);
    }
  };

  const EmerWithdrawFunc = () => {
    try {
      const res = Emerwithdraw(config1, CONTRACT_ADDRESS_HARD);
    } catch (error) {
      console.log("withdrawErr:", error);
    }
  };

  const allClaim = () => {
    try {
      const res = claimRewardsHard(config1);
    } catch (error) {
      console.log("allClaim Err:", error);
    }
  };

  const showRemain = (rewardRemainValue: string) => {
    console.log("reward Remain -> " + rewardRemainValue);
    if (rewardRemainValue.length < 7) return rewardRemainValue;
    const start: any = rewardRemainValue.slice(0, 3); // Get first 3 digits
    const end: any = rewardRemainValue.slice(-3); // Get last 3 digits
    return `${start}...${end}`; // Combine with ellipsis
    // return rewardRemainValue;
  };

  const selectMax = async () => {
    const balance: any = (maxDeposit * 0.9999).toFixed(3);
    setShowAmount(balance);
    setAmount(balance * Math.pow(10, 18));
  };

  const showToolTip = () => {
    if (tooltipFlg === 0) setToolTipFlg(1);
    else setToolTipFlg(0);
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-green-200 pt-[200px]">
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
            <div className="flex justify-between w-[100%]">
              <div className="flex flex-col w-[45%] place-items-end justify-center px-2 py-8">
                <h1 className="text-orange-00 text-2xl text-center ">
                  Balance
                </h1>
              </div>
              <div className="flex flex-col w-[45%] place-items-start justify-center">
                <h1 className="text-orange-00 text-2xl text-center items-center my-6 animate-pulse drop-shadow-lg">
                  {convertBignitToString(totalBalance)}
                </h1>
              </div>
            </div>
            <div className="flex flex-row">
              <YourLockedValue value={yourValue} />
            </div>
            <div className="flex justify-between w-[100%]">
              <div className="flex flex-col w-[45%] place-items-end justify-center px-2 py-8">
                <h1 className="text-orange-00 text-2xl text-center ">
                  Max Deposit
                </h1>
              </div>
              <div className="flex flex-col w-[45%] place-items-start justify-center">
                <h1 className="text-orange-00 text-2xl text-center items-center my-6 animate-pulse drop-shadow-lg">
                  {convertBignitToString(maxDeposit)}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex w-[45%] place-items-end justify-end">
                <h1 className="text-orange-00 text-2xl text-center w-[129px] mt-[15px]">
                  Input
                </h1>
                <button
                  onClick={selectMax}
                  className="border border-2 border-orange-200 text-orange-00 h-8 mt-8 text-[11px] text-white px-2  hover:cursor-pointer"
                >
                  MAX
                </button>
              </div>
              <div className="w-[45%] place-items-start justify-center">
                <input
                  className="bg-transparent w-[80%] text-left focus:outline-2 outline-2 outline-green-1 font-bold mt-5 mx-10 text-2xl text-center px-3 h-12 z-20 text-orange-00"
                  placeholder="0"
                  value={showAmount ? showAmount : ""}
                  // disabled={disabled}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            <div
              onClick={depositNew}
              className="relative text-3xl mr-10 hover:cursor-pointer font-medium text-orange-200 text-center z-10 mt-[50px] mb-[30px]"
            >
              STAKE NOW
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
                <p
                  onClick={showToolTip}
                  className="border border-2 border-orange-200 text-orange-00 h-6 ml-3 text-[11px] text-white px-2 -pt-2 hover:cursor-pointer"
                >
                  ...
                </p>

                {tooltipFlg === 1 ? (
                  <div className="tooltip absolute bg-gray-700 text-white text-lg rounded-lg p-2 whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-full">
                    {rewardRemainValue}
                  </div>
                ) : (
                  <div className="tooltip absolute hidden bg-gray-700 text-white text-lg rounded-lg p-2 whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-full">
                    {rewardRemainValue}
                  </div>
                )}
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
              <button
                onClick={() => {
                  console.log("soft-all claimed!!!");
                }}
                type="button"
                className="flex justify-center items-center  w-full mt-4 py-3 bg-green-1 rounded-xl hover:shadow-button hover:shadow-blue-400 tracking-widest"
              >
                <div
                  onClick={EmerWithdrawFunc}
                  className="relative text-2xl font-medium text-orange-00 text-center z-10"
                >
                  Emergency Withdraw
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
