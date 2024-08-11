import { createPublicClient, http, custom } from 'viem'
import { publicActionsL1 } from 'viem/zksync';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  cronos,
} from 'wagmi/chains';

export const publicClient = createPublicClient({
  chain: cronos,
  transport: custom(window.ethereum)
}).extend(publicActionsL1())
