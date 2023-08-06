import { subscription, user } from '@/types'
import Following from './following'
import { getQuerySubscribers } from '@/lib/queries'
import fetchJson from '@/lib/fetchJson'

export default async function FollowingPage({
  params: { userId }
}: {
  params: { userId: string }
}) {
  const user = await fetchJson<user>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?populate[subscription]=true`
  )
  const subsribers = await fetchJson<subscription>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions/${
      user.subscription!.id
    }?populate[targets][populate][profile]=true`,
    { next: { tags: [`following_${userId}`] } }
  )

  return <Following subscribersData={subsribers} />
}
