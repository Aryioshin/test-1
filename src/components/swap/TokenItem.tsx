'use client'

import { TOKEN } from '@/config'
import Image from 'next/image';

export default function TokenItem(props: any) {
  const token: TOKEN = props.token;
  return (
    <div className="flex w-full gap-3 items-center p-1 rounded hover:bg-primary-gray-300 hover:cursor-pointer">
      <div className="relative w-8 h-8">
        <Image className="rounded-full" src={`/token_icons/${token.name}.png`} fill alt="" />
      </div>
      <div className="">
        {token.name}
      </div>
    </div>
  )
}