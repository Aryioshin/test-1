
import SwapSide from "@/components/swap/SwapSide"
import { ArrowUpDown, Wallet2 } from "lucide-react"
import ConnectButton from "@/components/ConnectButton"

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-white">
      <div className="relative w-[450px] h-[340px] shadow-3xl shadow-primary-blue-300 rounded-3xl bg-primary-gray-200/0 p-3">
        <div className="flex justify-between gap-2 px-4">
          <div className="rounded flex justify-center items-center text-2xl font-bold hover:cursor-pointer">
            SWAP
          </div>
          <div className="rounded flex justify-center items-center text-md text-primary-gray-50 font-bold hover:cursor-pointer">
            STAKING
          </div>
        </div>
        <div className="mt-[10px] flex flex-col">
          <SwapSide />
          <ArrowUpDown className="mx-auto scale-[200%] bg-primary-gray-300 rounded" size={10} />
          <SwapSide />
        </div>
        <div className="flex w-full bg-primary-gray-100 rounded-3xl justify-center text-2xl p-4 my-4" >
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}