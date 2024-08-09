
import Image from 'next/image'

export default function Decor() {
  return (
    <div className="absolute w-full">
      <div className="relative top-[40px] left-[30%]">
        <div className="relative w-[500px] aspect-video">
          <Image src="/ary2.png" fill alt=""></Image>
        </div>
      </div>
    </div>
  )
}