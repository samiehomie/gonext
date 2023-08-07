import { subscribers } from '@/types'
import Follower from '../../(components)/follower'
import { getQuerySubscribers } from '@/lib/queries'
import fetchJson from '@/lib/fetchJson'

export default async function FollowerPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const querySubscribers = getQuerySubscribers(userId)

  return <Follower userId={userId} />
}
