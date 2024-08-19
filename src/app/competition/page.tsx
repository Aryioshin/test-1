'use client'
import { useEffect, useState } from "react"
import { Address } from "viem";
import VolumeTable from "@/components/competition/VolumeTable"
import { getVolumes, volumeSort } from "@/utils/actions";
import { IVolume } from "@/utils/actions";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [userVolume, setUserVolume] = useState<Array<IVolume>>([]);
  const getVolumesSync = async () => {
    const res = await getVolumes();
    return res;
  }
  useEffect(() => {
    const res: any = getVolumesSync();
    // if(res) setUserVolume(res);
    setUserVolume(volumeSort(list));
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-[100vh] text-green-200">
      <div className="relative w-[calc(100%-10px)] md:w-[700px] bg-green-950/80 px-5 pt-10 pb-4 mx-4 shadow-3xl shadow-green-600/70 rounded-3xl backdrop-blur-sm">
        <div className="flex justify-between items-baseline mb-4 px-8">
          <div className="text-2xl text-gray-400 hover:text-blue-400 hover:cursor-pointer hover:scale-125 hover:bottom-4 bottom-0 transition-all duration-100" onClick={()=>{router.push("/swap")}}>SWAP</div>
          <div className="text-3xl hover:cursor-pointer">
            BATTLE
          </div>
          <div className="text-2xl text-gray-400 hover:text-blue-400 hover:cursor-pointer hover:scale-125 hover:bottom-4 bottom-0 transition-all duration-100" onClick={()=>{router.push("/staking")}}>STAKING</div>
        </div>
        {userVolume.length > 0 && <VolumeTable userVolume={userVolume} />}
      </div>
    </div>
  )
}

export const list: any = [
  { user: "CYwdd8WnXCHrgyxQVnRcTPtyzLQoXAcgtXdYLnUtUQco", volume: "347554568" },
  { user: "HDKXtYrMrSxZ9rXrSYnVX52AWVvtsojNauCfxcooMdJb", volume: "2345" },
  { user: "CqA42zXaf5zXk7EW7jtCLfL2uH1efuB9GtTfjfJ2hzoq", volume: "4555345634563" },
  { user: "ESKAnQfbdU8THQhbXXmzJyQWCVfHVCWZBYjA2RjxSG8v", volume: "234233452345435734" },
  { user: "4rhfPZRBcZkoSzStSCFLo6KmLiX2eBAMigZh2bBLPYMw", volume: "234623462346234" },
  { user: "J5JmBJo7aVuHHu29rt3QKh6nThVJ1xgLh6f4KA1aWGTj", volume: "632623" },
  { user: "H7ivexjsSUjhgbk8dsBzSG4uoyRWUprRR7MKfP1h95Sn", volume: "7168767" },
  { user: "ApsPgj82WLy1xCjsnu8AJ53rrTQ8C4FzRtL2EtnzQY3Z", volume: "74864377" },
  { user: "9NzJcGVsFuRAw1jQzk4G7nG6EBm1RmhnttZ2T27rCKLv", volume: "373423778967" },
  { user: "4XPRD55epzsFEv7HSphhFWCYPV8ZjhiMb68FEQfsydm1", volume: "100000" },
  { user: "9qM7JWXmXYvJpebvZHadfYCsBDduuvkMCLXZPHS9CWkL", volume: "378796786" },
  { user: "6jRCQUSLAVdFRKBamyGuXu2uZduqNwniytWoxh2HYaD7", volume: "4343837" },
  { user: "8Q2LyvqZEVAKQ3e62FetL2JcsBFB4hjSFMSWEQx71BMq", volume: "7731333" },
  { user: "FtR2ZFqNVNz2H3oHwgQT4WY9Ho8YwjhJqLdKrBiq2sZf", volume: "778976" },
  { user: "DR5dHxndpMPkn7zdLhmxmK3bu5K6g5oEnQpgxcuRyX1k", volume: "1008876000" },
  { user: "6R8m49DhWU9KgC7o9ZECmJSB6qZgTgtoMGKAvbu8MoJN", volume: "1343400000" },
  { user: "BRv3fB6cnKSx51ngD5J9Pa5WHfWd9AgA3rKSyP93mErv", volume: "11430014000" },
  { user: "CAyoLzAtDMy8Fyqr9MGcBhHmEnyhABVCUhbe2M2wUP9r", volume: "100761446000" },
  { user: "ArczY4LZP36Fz7dE3cyJagBX4DZksW8jJfJ7g8MZwVmk", volume: "1311311300000" },
  { user: "5StMtrxfB78yvWL93SrKiNPccgYW34zdGNLsY7b3sR9C", volume: "647170018000" },
  { user: "3jvJpnPnHTU7317ykJiYQh52a6u35y5D4wxomWg3RmoG", volume: "767671093676131790000" }
]