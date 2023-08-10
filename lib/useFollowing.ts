'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { subscription } from '@/types'

export default function useFollowing({
  subscriptionId
}: {
  subscriptionId: number | null | undefined
}) {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions/${subscriptionId}?populate[targets][populate][profile]=true`
  const { data: followings, mutate: mutatefollowings } = useSWR<subscription>(
    subscriptionId ? reqUrl : null,
    fetchJson
  )

  return { followings, mutatefollowings, reqUrl }
}
