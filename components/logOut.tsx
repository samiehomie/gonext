'use client'
import { ReactNode } from 'react'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'

export default function LogOut({ children }: { children: ReactNode }) {
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: false
  })
  const handleClick = async () => {
    mutateUser(await fetchJson('/api/auth/github/logout'), false)
  }
  return <button onClick={handleClick}>{children}</button>
}
