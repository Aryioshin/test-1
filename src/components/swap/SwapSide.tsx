'use client'

import { useState } from "react"
import TokenSelect from "./TokenSelect";

export default function SwapSide({ className = "", disabled = false, coin = null, setCoin }: { className?: string, disabled?: boolean, coin?: number | any, setCoin?:(value : any)=> void }) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState("");
  const selectedCoin = coin;

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    !isNaN(Number(value))
    setAmount(Number(value));
  }

  return (
    <div className={`bg-green-700/70 px-4 py-9 shadow-3s relative ${className}`}>
      <div className="absolute right-4 top-2">
        <div className="flex items-center gap-2">
          Balance: <span>12,234</span>
          <button className="bg-primary-gray-300 text-xs px-2 hover:bg-primary-gray-300/80 " style={{
            display: disabled ? "none" : "block"
          }}>MAX</button>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <TokenSelect coin={coin} setCoin={setCoin}/>
        <div className="flex items-center w-2/3">
          <input className="bg-transparent w-full text-right focus:outline-0 pr-2 text-2xl text-white focus:bg-green-600 px-3 h-12 z-20" value={amount} disabled={disabled} onChange={handleBalanceChange}></input>
        </div>
      </div>
      <div className="flex justify-end w-1/2 h-full absolute right-0 top-0">
      </div>
    </div>
  )
}