
import {readContract, writeContract} from 'wagmi/actions';
import { config } from './wagmi';
import { Address } from 'viem';
import { Abis } from '@/utils';
import { TOKEN_LIST } from '.';
import { currentChain } from '@/config'

export const swapWithNative = async (tokenId: number, amount:number, address:Address | undefined) => {
  const token : any = TOKEN_LIST[tokenId]
  const abi = Abis[token.name];
  const res = await writeContract(config, {
    abi,
    chainId: currentChain.id, // Make sure this is the correct chain ID for your case
    address: token.address as Address,
    functionName: 'deposit',
    args: [address as Address, amount],
    account: address as Address
  })
  console.log(res)
}