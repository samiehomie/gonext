'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { subscribers } from '@/types'

export default function useFollower({
  userId
}: {
  userId: string | number | null | undefined
}) {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions?filters[targets][id][$eq]=${userId}&populate[subscriber][populate][profile]=true`
  const { data: followers, mutate: mutatefollowers } = useSWR<subscribers>(
    userId ? reqUrl : null,
    fetchJson
  )

  return { followers, mutatefollowers, reqUrl }
}
