'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { subscription } from '@/types'

export default function useSubscription({
  subscriptionId
}: {
  subscriptionId: number | null | undefined
}) {
  console.log('----->', subscriptionId)
  const {
    data: followings,
    mutate: mutatefollowings,
    isLoading
  } = useSWR<subscription>(
    subscriptionId
      ? `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions/${subscriptionId}?populate[targets]=true`
      : null,
    fetchJson
  )

  return { followings, mutatefollowings }
}
