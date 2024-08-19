import CopyButton from "../copyBotton"



export default function UserVolume(props: any) {
  const { userVolume, index } = props
  console.log("Itmes", userVolume)
  return (
    <div className="flex py-1">
      <div className="w-1/12 text-center text-[15px] text-orange-200 px-1">{index + 1}</div>
      <div className="w-1/2 flex px-2">
        <div className="w-11/12 truncate text-center text-red-200 text-[15px]">
          {userVolume.user}
        </div>
        <div className="hover:cursor-pointer text-green-800 hover:text-blue-400">
          <CopyButton value={userVolume.user} />
        </div>
      </div>
      <div className="w-[41.6%] truncate text-center overflow-auto  text-blue-300 text-[15px] px-2">{userVolume.volume}</div>
    </div>
  )
}