// SwapSide.tsx
'use client';

import { useEffect, useState, useMemo } from "react";
import TokenSelect from "./TokenSelect";
import { TOKEN_LIST } from "@/config";
import { useAccount, useBalance, useChainId, useConfig } from "wagmi";
import { Address } from "viem";
import { getNativeBalance, getTokenBalance } from "@/utils/actions";

interface SwapSideProps {
  className?: string;
  disabled?: boolean;
  coin?: number;
  amount?: number;
  setCoin?: (value: any) => void;
  setAmount?: (value: any) => void;
}

export default function SwapSide({ className = "", disabled = false, coin = 0, setCoin, amount, setAmount = () => { } }: SwapSideProps) {
  const config = useConfig();
  const { address } = useAccount();
  const chainId = useChainId();
  const { isNative } = TOKEN_LIST[coin];
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      if (isNative) {
        const balance = await getNativeBalance(config, address as Address, chainId);
        setBalance(balance)
      } else {
        const balance = await getTokenBalance(config, address as Address, chainId, coin);
        setBalance(balance);
      }
    }
    getBalance();
  }, [coin, address, config, chainId])


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const selectMax = () => {
    setAmount(balance)
  }

  return (
    <div className={`bg-green-700/70 px-4 py-9 relative rounded-2xl ${className}`}>
      <div className="absolute right-4 top-2 z-20">
        <div className="flex items-center gap-2">
          Balance: <span>{balance}</span>
          {!disabled && (
            <button
              onClick={selectMax}
              className="bg-primary-gray-300 text-xs text-white px-2 rounded-md hover:cursor-pointer hover:shadow-blue-400 hover:text-blue-400 hover:shadow-button hover:bg-primary-gray-300/80"
            >
              MAX
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <TokenSelect coin={coin} setCoin={setCoin} />
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
