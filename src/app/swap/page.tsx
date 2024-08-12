'use client'

import SwapSide from "@/components/swap/SwapSide"
import { ArrowUpDown, Wallet2 } from "lucide-react"
import ActionButton from "@/components/ActionButton"
import { useCallback, useEffect, useState } from "react"
import { TOKEN_LIST } from "@/config"
import { useAccount } from "wagmi"
import { mint, withdraw } from "@/utils/actions"
import Image from "next/image"
import { toast } from "react-toastify"

export default function Page() {
  const [baseToken, setBaseToken] = useState(0);
  const [quoteToken, setQuoteToken] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const { address } = useAccount();

  useEffect(() => {
    console.log("baseToken", baseToken)
    console.log("quoteToken", quoteToken)
  }, [baseToken, quoteToken]);

  const clear = () => {
    setBaseToken(0)
    setQuoteToken(0)
    setBaseAmount(0)
    setQuoteAmount(0)
  }

  const swap = useCallback(async () => {
    if (baseToken == quoteToken) return;
    let res:boolean | undefined;
    if (TOKEN_LIST[baseToken].isNative && TOKEN_LIST[quoteToken].name == "WCRO") { res = await mint(quoteToken, baseAmount, address) }
    if (TOKEN_LIST[quoteToken].isNative && TOKEN_LIST[baseToken].name == "WCRO") { res = await withdraw(baseToken, baseAmount, address) }
    if (res) {
      clear();
      toast.success("Transaction successfully finished")
    }
  }, [quoteToken, baseAmount, address])
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-orange-400">
      <div className="relative w-[450px] bg-green-950/80 px-5 pt-10 pb-4 mx-4 shadow-3xl shadow-green-600/70 rounded-3xl backdrop-blur-sm">
        <div className="flex justify-between gap-2 px-8">
          <div className="rounded flex justify-center items-center text-2xl font-bold hover:cursor-pointer text-orange-300 hover:text-blue-400">
            SWAP
          </div>
          <div className="rounded flex justify-center items-center text-md hover:cursor-pointer hover:text-blue-400 text-gray-400">
            STAKING
          </div>
        </div>
        <div className="mt-[10px] flex flex-col relative">
          <SwapSide setCoin={setBaseToken} coin={baseToken} amount={baseAmount} setAmount={setBaseAmount} />
          <div className="w-14 h-14 grid place-content-center rounded-full bg-green-600/20 backdrop-blur-sm shadow-3s absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Image src="/swap.png" fill alt="" />
          </div>
          <SwapSide className="mt-5" disabled setCoin={setQuoteToken} coin={quoteToken} amount={quoteAmount} setAmount={setQuoteAmount} />
        </div>
        <div className="mt-4" >
          <ActionButton swap={swap} />
        </div>
      </div>
    </div>
  )
}