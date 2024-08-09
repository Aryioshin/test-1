'use client'

import { useState } from "react"
import { ChevronDown } from "lucide-react";

export default function SwapSide(){
  const [base, setBase]=useState(0);
  const [price, setPrice] = useState("");

  const handleBalanceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    !isNaN(Number(value))
    setBase(Number(value));
  }

  return (
    <div className="flex rounded-3xl border border-gray-500 h-[110px] p-4">
      <div className="flex items-center w-1/2 h-full">
        <input className="bg-transparent focus:outline-0 pl-2 text-2xl text-white mtsemibold" value={base} onChange={handleBalanceChange}></input>
      </div>
      <div className="flex justify-end w-1/2 h-full">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            Balance
            <button className="rounded-3xl px-1 bg-primary-gray-300 text-[10px] p-[2px]">MAX</button>
          </div>
          <button className="flex items-center gap-2 border rounded-3xl py-1 px-3 hover:shadow-2xl shadow-blue-400">Select Token<ChevronDown className="mt-1" size={15}/></button>
          <div>
            {`Price : ${price}`}
          </div>
        </div>
      </div>
    </div>
  )
}