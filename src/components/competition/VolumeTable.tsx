import { Address } from "viem"
import { IVolume } from "@/utils/actions"
import UserVolume from "./UserVolume"

export default function VolumeTable({ userVolume }: { userVolume?: Array<IVolume> }) {
  console.log(userVolume)
  return (
    <div className="bg-green-700/30 px-4 py-9 relative rounded-2xl">
      <div className="flex text-orange-200">
        <div className="w-1/12 text-center text-[15px]">No</div>
        <div className="w-1/2 truncate text-center text-[15px]">Account</div>
        <div className="w-[41.6%] text-center text-[15px]">Volume</div>
      </div>
      {userVolume?.map((item, index) => { return <UserVolume userVolume={item} key={index} index={index} /> })}
    </div>
  )
}