import ARY from '@/abis/ARY.json';
import USDC from '@/abis/USDC.json';
import USDT from '@/abis/USDT.json';
import WCRO from '@/abis/WCRO.json';

export const Abis: {[key: string]: any} = { ARY, USDC, USDT, WCRO };

export interface TokenConfig {
  name: keyof typeof Abis;
  address: string | undefined;
}

export const getAbi = (token: TokenConfig) => {
  const { name, address } = token;
  const abi = Abis[name];

  return abi
};
