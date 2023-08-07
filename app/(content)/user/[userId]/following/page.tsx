import { user } from '@/types'
import Following from '../../(components)/following'
import fetchJson from '@/lib/fetchJson'

export default async function FollowingPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const user = await fetchJson<user>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?populate[subscription]=true`
  )

  return <Following subscriptionId={user.subscription!.id} />
}
