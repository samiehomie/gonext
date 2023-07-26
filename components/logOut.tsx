'use client'
import type { userSession } from '@/types'
import { ReactNode } from 'react'
import Link from 'next/link'
export default function LogOut({
  children,
  setUser,
}: {
  children: ReactNode
  setUser: (arg: userSession | null) => void
}) {
  return (
    <Link
      prefetch={false}
      href="/api/auth/github/logout"
      onClick={() => {
        setUser(null)
      }}
    >
      {children}
    </Link>
  )
}
