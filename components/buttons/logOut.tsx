'use client'
import { ReactNode } from 'react'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import { useRouter } from 'next/navigation'

export default function LogOut({ children }: { children: ReactNode }) {
  const { mutateUser } = useUser()
  const router = useRouter()
  const handleClick = async () => {
    mutateUser(await fetchJson('/api/auth/github/logout'), false)
    router.push('/')
  }
  return <button onClick={handleClick}>{children}</button>
}
