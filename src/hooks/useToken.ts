'use client';

import { currentChain, TOKEN_LIST } from "@/config";
import { useMemo, useCallback, useEffect, useState } from "react";
import { useAccount, useConfig } from "wagmi";
import { readContract } from "wagmi/actions";
import { Address } from "viem";
import { Abis } from "@/utils";

const useTokenBalance = (tokenId: number) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);

  const token = TOKEN_LIST[tokenId] ;
  const abi = useMemo(() => Abis[token.name], [token.name]);
  const config = useConfig();

  const getTokenBalance = useCallback(async () => {
    if (!address || !token || !abi) return;

    try {
      const balance: any = await readContract(config,{
        abi,
        chainId: currentChain.id, // Make sure this is the correct chain ID for your case
        address: token.address as Address,
        functionName: 'balanceOf',
        args: [address as Address],
      });
      setBalance(Number(balance) / Math.pow(10, token.decimal));
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
      setBalance(0);
    }
  }, [abi, address, token]);

  useEffect(() => {
    getTokenBalance();
  }, [getTokenBalance]);

  return balance;
};

export default useTokenBalance;
