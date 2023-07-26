'use client'
import type { userSession } from '@/types'
import useSWR from 'swr'
import { fetcher } from './lib/fetchData'

export function useSession(where?: string) {
  console.log('useSession--->', where)
  const {
    data: user,
    error,
    isLoading,
  }: { data: userSession | undefined; error: any; isLoading: boolean } = useSWR(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/session`,
    fetcher,
    { revalidateOnMount: true, dedupingInterval: 1000 },
  )

  return user
}
