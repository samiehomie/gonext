import Link from 'next/link'
import Image from 'next/image'
import { user } from '@/types'

export default async function TopProfile({ userData }: { userData: user }) {
  return (
    <div className="absolute text-center left-[250px] right-[250px] h-full">
      <div className="table h-full mx-auto">
        <h2
          className="text-[#666] font-noto_sans_light text-[16.5px] leading-none
                font-normal whitespace-nowrap align-middle table-cell tracking-tight"
        >
          <Link href={`/${userData.id}`}>
            <Image
              src={userData.profile?.formats.small.url as string}
              alt={userData.username}
              width={30}
              height={30}
              className="rounded-full inline-block mr-[6px]"
            />
            <span
              className="text-[#333] inline-block pt-[5px] align-top 
                        whitespace-nowrap font-noto_sans_demlight text-[17px] tracking-[-1px]"
            >
              {userData.username}
            </span>
          </Link>
        </h2>
      </div>
    </div>
  )
}
