
import { readContract, writeContract } from '@wagmi/core';
import { config } from '../config/wagmi';
import { Address } from 'viem';
import { Abis } from '@/utils';
import { TOKEN_LIST } from '../config';
import { currentChain } from '@/config'
import { nativeCoin } from '../config';
import { getBalance } from 'wagmi/actions';
import { parseEther } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions';
import { toast } from 'react-toastify';

export const mint = async (tokenId: number, tokenAmount: number, address: Address | undefined) => {
  const token: any = TOKEN_LIST[tokenId]
  const abi = Abis[token.name];

  try {
    const res = await writeContract(config, {
      abi,
      chainId: currentChain.id, // Make sure this is the correct chain ID for your case
      address: token.address as Address,
      functionName: 'deposit',
      args: [],
      account: address as Address,
      value: parseEther(tokenAmount.toString()),
    }).then(async (hash) => {
      console.log("Approve Tx:", hash);
      toast.warning('Please wait');
      await waitForTransactionReceipt(config, {
        hash,
      });
      return true
    })
    .catch((reason) => {
      console.log("Approve Faild:", reason);
      return false
    });
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const withdraw = async (tokenId: number, tokenAmount: number, address: Address | undefined) => {
  const amount = BigInt(tokenAmount * Math.pow(10, nativeCoin.decimal))
  const token: any = TOKEN_LIST[tokenId]
  const abi = Abis[token.name];

  try {
    const res = await writeContract(config, {
      abi,
      chainId: currentChain.id, // Make sure this is the correct chain ID for your case
      address: token.address as Address,
      functionName: 'withdraw',
      args: [amount],
      account: address as Address
    }).then(async (hash) => {
      console.log("Approve Tx:", hash);
      toast.warning('Please wait');
      await waitForTransactionReceipt(config, {
        hash,
      });
      return true
    })
    .catch((reason) => {
      console.log("Approve Faild:", reason);
      return false
    });
    return res;
  } catch (error) {
    console.log(error)
    return false
  }
}


export const getNativeBalance = async (config: any, address: Address, chainId: number) => {
  if (!address) return 0;
  const { decimals, value } = await getBalance(config, { address, chainId });

  return convertBignitTofloat(value, decimals);
}

export const getTokenBalance = async (config: any, address: Address, chainId: number, tokenId: number) => {
  const token = TOKEN_LIST[tokenId];
  const tokenAddress = token.address;
  const abi = Abis[token.name]
  if (!address || !config || !tokenAddress) return 0;
  const tokenBalance = await readContract(config, {
    abi, functionName: 'balanceOf',
    address: tokenAddress as Address, chainId, args: [address as Address]
  })

  return convertBignitTofloat(tokenBalance, token.decimal);
}

export const convertBignitTofloat = (value: any, decimal: number) => {
  return parseFloat((Number(value) / Math.pow(10, decimal)).toFixed(3))
}
