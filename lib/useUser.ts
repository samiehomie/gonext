'use client'
import { useEffect } from 'react'
import type { userSession } from '@/types'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<userSession>(
    '/api/auth/github/user',
    fetchJson
  )
  const router = useRouter()
  useEffect(() => {
    // 리다이렉트가 필요없거나 아직 유저 데이터가 없으면 곧바로 리턴
    if (!redirectTo || !user) return
    // redirectTo를 설정하고 유저가 없는 경우 또는
    // redirectIfFound를 설정하고 유저가 있는 경우 리다이렉트
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
