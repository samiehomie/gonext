'use client'
import { ReactNode, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { logOut } from '@/authActions'
import { userDataContext, type usertStateType } from '@/components/userContext'
import { redirect } from 'next/navigation'
import { frontUrl } from '@/lib/utils'
export default function LogOut({ children }: { children: ReactNode }) {
  const [_, setUser] = useContext(userDataContext) as usertStateType
  const pathname = usePathname()
  console.log(pathname)
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        logOut()
        setUser(null)
        redirect(frontUrl + pathname)
      }}
    >
      {children}
    </a>
  )
}
