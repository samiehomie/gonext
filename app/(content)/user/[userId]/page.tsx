import { queryUser } from '@/lib/queries'
import { user, users } from '@/types'
import Content from '@/app/(content)/user/(components)/content'
import fetchJson from '@/lib/fetchJson'
import TopNavigationContainer from '../(components)/containers/topNavigationContainer'
import ProfileContainer from '../(components)/containers/profileContainer'

export default async function AuthorPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const userData = await fetchJson<user>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}${queryUser}`,
    { next: { tags: [`userPage_${userId}`] } }
  )

  return (
    <>
      <TopNavigationContainer userData={userData} />
      <ProfileContainer userData={userData} />
      <Content userData={userData} />
    </>
  )
}

export const revalidate = 36000

export async function generateStaticParams() {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${queryUser}`
  const users: users = await fetch(reqUrl).then((res) => res.json())
  return users.map((user) => ({
    userId: `${user.id}`
  }))
}
