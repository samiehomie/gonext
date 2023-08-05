'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { writingsInUser } from '@/types'

export default function useWritings({ userId }: { userId: number }) {
  const { data: writings, mutate: mutateWritings } = useSWR<writingsInUser>(
    `/api/writing/?userId=${userId}`,
    fetchJson
  )

  return { writings, mutateWritings }
}
