'use client'

import { useState } from "react"
import { ChevronDown } from "lucide-react";
import TokenSelect from "./TokenSelect";

export default function SwapSide() {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState("");

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    !isNaN(Number(value))
    setAmount(Number(value));
  }

  return (
    <div className="flex rounded-3xl border border-gray-500 h-[110px] p-4">
      <div className="flex items-center w-1/2 h-full">
        <input className="bg-transparent focus:outline-0 pl-2 text-2xl text-white mtsemibold" value={amount} onChange={handleBalanceChange}></input>
      </div>
      <div className="flex justify-end w-1/2 h-full">
        <div className="flex flex-col justify-around">
          <div className="flex justify-between">
            Balance
            <button className="rounded-3xl px-1 bg-primary-gray-300 text-[10px] p-[2px]">MAX</button>
          </div>
          <TokenSelect />
        </div>
      </div>
    </div>
  )
}