import Profile from '@/components/author/profile'
import { queryUser } from '@/lib/queries'
import { user, users } from '@/types'
import Content from '@/components/author/content'
import TopNavigation from '@/components/navigations/topNavigation'
import TopProfile from '../topProfile'

export default async function AuthorPage({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const userData: user = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?${queryUser}`,
    { next: { tags: ['userPage'] } },
  ).then((res) => res.json())
  return (
    <>
      <TopNavigation inBookPage={true}>
        <TopProfile userData={userData} />
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
