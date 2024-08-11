// SwapSide.tsx
'use client';

import { useEffect, useState, useMemo } from "react";
import TokenSelect from "./TokenSelect";
import { getAbi } from "@/utils";
import { TOKEN_LIST } from "@/config";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import useTokenBalance from "@/hooks/useToken";

interface SwapSideProps {
  className?: string;
  disabled?: boolean;
  coin?: number;
  amount?:number;
  setCoin?: (value: any) => void;
  setAmount?: (value: any) => void ;
}

export default function SwapSide({ className = "", disabled = false, coin = 0, setCoin, amount, setAmount = () => {} }: SwapSideProps) {
  const balance = useTokenBalance(coin)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <div className={`bg-green-700/70 px-4 py-9 relative rounded-2xl ${className}`}>
      <div className="absolute right-4 top-2 z-20">
        <div className="flex items-center gap-2">
          Balance: <span>{balance}</span>
          {!disabled && (
            <button
              className="bg-primary-gray-300 text-xs text-white px-2 rounded-md hover:cursor-pointer hover:shadow-blue-400 hover:text-blue-400 hover:shadow-button hover:bg-primary-gray-300/80"
            >
              MAX
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <TokenSelect coin={coin} setCoin={setCoin}/>
        <div className="flex items-center w-2/3">
          <input
            className="bg-transparent w-full text-right focus:outline-0 pr-2 text-2xl text-white px-3 h-12 z-20"
            value={amount}
            disabled={disabled}
            onChange={handleAmountChange}
          />
        </div>
      </div>
      <div className="flex justify-end w-1/2 h-full absolute right-0 top-0"></div>
    </div>
  );
}
