'use client'
import { ReactNode, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { userDataContext, type usertStateType } from '@/components/userContext'
import { useRouter } from 'next/navigation'

export default function LogOut({ children }: { children: ReactNode }) {
  const [_, setUser] = useContext(userDataContext) as usertStateType
  const pathname = usePathname()
  const router = useRouter()
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        setUser(null)
        router.replace('/api/auth/github/logout')
      }}
    >
      {children}
    </a>
  )
}
