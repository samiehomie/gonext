'use client'
import { ReactNode, useContext } from 'react'
import { usePathname } from 'next/navigation'
import {
  startModalContext,
  type startStateType,
} from '@/components/userContext'
import { useRouter } from 'next/navigation'

export default function LogOut({ children }: { children: ReactNode }) {
  const {
    user: [_, setUser],
  } = useContext(startModalContext) as startStateType
  const pathname = usePathname()
  const router = useRouter()
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        setUser(null)
        router.push(`/api/auth/github/logout?back=${pathname}`)
      }}
    >
      {children}
    </a>
  )
}
