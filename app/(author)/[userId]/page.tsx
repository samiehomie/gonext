import Profile from '@/components/author/profile'
import { queryUser } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import { user, users } from '@/types'
import TopNavigation from '@/components/navigations/topNavigation'
import Link from 'next/link'
import Image from 'next/image'
import Content from '@/components/author/content'

export default async function AuthorPage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const userData: user = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?${queryUser}`, { next: { tags: ['userPage']}}
  ).then(res => res.json())
  return (
    <>
      <TopNavigation inBookPage={true}>
        <div className="absolute text-center left-[250px] right-[250px] h-full">
          <div className="table h-full mx-auto">
            <h2
              className="text-[#666] font-noto_sans_light text-[16.5px] leading-none
                      font-normal whitespace-nowrap align-middle table-cell tracking-tight"
            >
              <Link href={`/${userId}`}>
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
      </TopNavigation>
      <Profile userData={userData} />
      <Content userData={userData} />
    </>
  )
}

export const revalidate = 3600

export async function generateStaticParams() {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${queryUser}`
  const users: users = await fetch(reqUrl).then((res) => res.json())
  return users.map((user) => ({
    userId: `${user.id}`,
  }))
}
