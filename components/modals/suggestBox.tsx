'use client'

import { useState, useRef } from 'react'
import { fetcher } from '@/lib/fetchData'
import useSWR from 'swr'

export default function SuggestBox() {
  return (
    <div>
      <div className="h-[40px] transition duration-300 ease-in-out">
        <div
          className="box-border overflow-hidden pt-[275px] pb-[227px] 
                flex flex-col justify-center bg-white font-noto_sans_light
                fixed top-0 left-0 w-full h-full z-50"
        >
          <div className="h-[440px] bg-slate-800"></div>
        </div>
      </div>
    </div>
  )
}
