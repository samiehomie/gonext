'use client'

import { createContext, useState } from 'react'

export function StartModalProvider({
  children,
}: {
  children: React.ReactElement
}) {
  const [onStart, setOnStart] = useState(false)
  const startModalContext = createContext(null)
}
