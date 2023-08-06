import { subscribers } from '@/types'
import Follower from './follower'
import { getQuerySubscribers } from '@/lib/queries'
import fetchJson from '@/lib/fetchJson'

export default async function FollowerPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const querySubscribers = getQuerySubscribers(userId)
  const subsribers = await fetchJson<subscribers>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions${querySubscribers}`,
    { next: { tags: [`follower_${userId}`] } }
  )

  return <Follower subscribersData={subsribers} />
}
