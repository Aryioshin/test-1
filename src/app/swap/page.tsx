
import SwapSide from "@/components/swap/SwapSide"
import { ArrowUpDown, Wallet2 } from "lucide-react"

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-blue-400">
      <div className="relative w-[500px] h-[400px] shadow-3xl shadow-primary-blue-300 rounded-3xl bg-primary-gray-200 p-3">
        <div className="rounded flex justify-center items-center text-2xl text-white font-bold">
          SWAP
        </div>
        <div className="mt-[10px] flex flex-col">
          <SwapSide />
          <ArrowUpDown className="mx-auto scale-[200%] bg-primary-gray-300 rounded" size={10}/>
          <SwapSide />
        </div>
        <div className="flex items-center h-[50px] rounded-2xl my-2 bg-primary-gray-300 p-8">
          Fees
        </div>
        <div>
          <button className="flex w-full bg-primary-gray-100 rounded-3xl justify-center text-2xl p-4">
            <Wallet2 />
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}