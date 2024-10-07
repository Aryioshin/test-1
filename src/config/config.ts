import { http, createConfig } from '@wagmi/core'
import { cronos } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [cronos],
  transports: {
    [cronos.id]: http(),
  },
})