//For Cronos
// export const TOKEN_LIST = [
//   { name: "CRO", isNative:true, address: "" },
//   { name: "ARY", isNative:false, address: "0x41bc026dABe978bc2FAfeA1850456511ca4B01bc", decimal: 18},
//   { name: "WCRO", isNative:false, address: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23", decimal: 18},
//   { name: "USDC", isNative:false, address: "0xc21223249CA28397B4B6541dfFaEcC539BfF0c59", decimal: 6},
//   { name: "USDT", isNative:false, address: "0x66e428c3f67a68878562e79A0234c1F83c208770", decimal: 6},
// ]

import { sepolia, cronos } from "viem/chains"

//For test 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9
export const TOKEN_LIST = [
  { name: "CRO", isNative:true, address: "", decimal:18 },
  { name: "WCRO", isNative:false, address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9", decimal: 18},
  { name: "ARY", isNative:false, address: "0x7C51fE4a0522f2b51BF35335F89E59A2b00e9851", decimal: 18},
  { name: "USDC", isNative:false, address: "0x60A5a4efFd8E57125B957f91390597853F75662C", decimal: 18},
  { name: "USDT", isNative:false, address: "0x6Eb2aB1cf0e5A8C9d62444816e75B095ccd55c98", decimal: 18},
]

export const nativeCoinId = 0
export const nativeCoin = TOKEN_LIST[nativeCoinId]
export const currentChain = sepolia;

export const cronosConfig = {
  chainId: 25,
  chainName: 'Cronos',
  network: 'cronos',
  nativeCurrency: {
    decimals: 18,
    name: 'Cronos',
    symbol: 'CRO',
  },
  rpcUrls: [
    'https://cronos.blockpi.network/v1/rpc/public'
  ],
  blockExplorerUrls: [
    'https://cronoscan.com'
  ]
}