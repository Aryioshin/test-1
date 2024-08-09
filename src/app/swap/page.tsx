
import SwapSide from "@/components/swap/SwapSide"
import { ArrowUpDown, Wallet2 } from "lucide-react"

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-blue-400">
      <div className="relative w-[450px] h-[340px] shadow-3xl shadow-primary-blue-300 rounded-3xl bg-primary-gray-200 p-3">
        <div className="flex gap-2 px-4">
          <div className="rounded flex justify-center items-center text-2xl font-bold hover:cursor-pointer">
            SWAP
          </div>
          <div className="rounded flex justify-center items-center text-2xl text-primary-blue-200 font-bold hover:cursor-pointer">
            STAKING
          </div>
        </div>
        <div className="mt-[10px] flex flex-col">
          <SwapSide />
          <ArrowUpDown className="mx-auto scale-[200%] bg-primary-gray-300 rounded" size={10} />
          <SwapSide />
        </div>
        <div className="my-4">
          <button className="flex w-full bg-primary-gray-100 rounded-3xl justify-center text-2xl p-4">
            <Wallet2 />
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}