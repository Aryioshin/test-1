'use client'

import { useState } from "react"
import TokenSelect from "./TokenSelect";

export default function SwapSide({ className = "", disabled = false }: { className?: string, disabled?: boolean }) {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState("");

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
      <div className="flex items-center gap-3">
        <TokenSelect />
        <div className="flex items-center w-[calc(100%-122px)]">
          <input className="bg-transparent w-full text-right border focus:outline-0 pl-2 text-2xl text-white border-white/30 focus:bg-green-600 px-3 h-12 z-20" value={amount} disabled={disabled} onChange={handleBalanceChange}></input>
        </div>
      </div>
      <div className="flex justify-end w-1/2 h-full absolute right-0 top-0">
      </div>
    </div>
  )
}