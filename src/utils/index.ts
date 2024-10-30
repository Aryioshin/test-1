import ARY from '@/abis/ARY.json';
import abi from '@/abis/abi.json';
import USDC from '@/abis/USDC.json';
import USDT from '@/abis/USDT.json';
import WCRO from '@/abis/WCRO.json';
import MERY from '@/abis/mery.json';
import TURTLE from '@/abis/turtle.json';

import Contract from '@/abis/Contract.json';
import Contract_ary from '@/abis/abi.json';
import VVS2_Router_Abi from '@/abis/VVS2_Router.json';
import FACTORY from '@/abis/Factory.json';
import HARDSTACK from '@/abis/hardStack.json';

export const Abis: {[key: string]: any} = { ARY, USDC, USDT, WCRO, MERY, TURTLE };
export const ABI = abi;
export const CONTRACT_ABI = Contract;
export const CONTRACT_ABI_ARY = Contract_ary;
export const VVS2_ABI = VVS2_Router_Abi;
export const FACTORY_ABI = FACTORY;
export const CONTRACT_ABI_HARD = HARDSTACK;

export interface TokenConfig {
  name: keyof typeof Abis;
  address: string | undefined;
}

export const getAbi = (token: TokenConfig) => {
  const { name, address } = token;
  const abi = Abis[name];

  return abi
};
