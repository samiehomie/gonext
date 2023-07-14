'use client'
import { ReactNode } from 'react'
import { SWRConfig } from 'swr'

export default function SwrProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (query: string) =>
          fetch(`${process.env.NEXT_PUBLIC_DB_URL}/api/${query}`).then((res) =>
            res.json(),
          ),
      }}
    >
      {children}
    </SWRConfig>
  )
}
