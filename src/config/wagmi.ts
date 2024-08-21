
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  sepolia,
  cronos,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit text',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    cronos,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
