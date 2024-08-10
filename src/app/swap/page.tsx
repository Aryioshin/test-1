
import SwapSide from "@/components/swap/SwapSide"
import { ArrowUpDown, Wallet2 } from "lucide-react"
import ConnectButton from "@/components/ConnectButton"

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-blue-400">
      <div className="relative w-[450px] bg-green-950/80 px-5 py-8 shadow-box text-gray-100 backdrop-blur-sm">
        <div className="flex justify-between gap-2">
          <div className="rounded flex justify-center items-center text-2xl font-bold hover:cursor-pointer">
            SWAP
          </div>
          <div className="rounded flex justify-center items-center text-md text-gray-100 hover:cursor-pointer">
            STAKING
          </div>
        </div>
        <div className="mt-[10px] flex flex-col relative">
          <SwapSide />
          <div className="w-14 h-14 grid place-content-center bg-green-950 shadow-3s absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <ArrowUpDown className="" fontSize={12} />
          </div>
          <SwapSide className="mt-5" disabled />
        </div>
        <div className="mt-4" >
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}