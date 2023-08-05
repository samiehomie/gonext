import Profile from '@/components/author/profile'
import { queryUser, getQuerySubscribers } from '@/lib/queries'
import { user, users, subscribers } from '@/types'
import Content from '@/components/author/content'
import TopNavigation from '@/components/navigations/topNavigation'
import TopProfile from '../topProfile'
import fetchJson from '@/lib/fetchJson'
export default async function AuthorPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const querySubscribers = getQuerySubscribers(userId)
  const subsribers = fetchJson<subscribers>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions${querySubscribers}`
  )
  const user = fetchJson<user>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}${queryUser}`,
    { next: { tags: ['userPage'] } }
  )
  const [userData, subscribersData] = await Promise.all([user, subsribers])
  return (
    <>
      <TopNavigation isBlack={true}>
        <TopProfile userData={userData} />
      </TopNavigation>
      <Profile userData={userData} subscribersData={subscribersData} />
      <Content userData={userData} />
    </>
  )
}

export const revalidate = 3600

export async function generateStaticParams() {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${queryUser}`
  const users: users = await fetch(reqUrl).then((res) => res.json())
  return users.map((user) => ({
    userId: `${user.id}`
  }))
}
