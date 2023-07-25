'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export default function LogOut({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <button
      onClick={async (e) => {
        e.preventDefault()
        await fetch('/api/auth/github/logout')
        router.push('/')
      }}
    >
      {children}
    </button>
  )
}
