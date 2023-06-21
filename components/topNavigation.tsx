'use client'
import { useState, useEffect } from 'react'

export default function TopNavigation() {
  return (
    <div className="h-[60px]">
      <div className="h-[40px] w-full static float-left">
        <div className="mt-[30px] ml-[30px] mr-[30px]">
          <div className="float-left">
            <button
              className="bg-ico-brunch-sub overflow-hidden 
            indent-[-999px] leading-none h-[20px] w-[27px] 
            mr-[14px] bg-[0px_0px] float-left"
            >
              메뉴
            </button>
            <h1 className="inline-block float-left">
              <a
                href="/"
                className="block leading-none indent-[-999px] 
                overflow-hidden w-[120px] h-[22px] mt-[-1px] 
                bg-ico-brunch-titles bg-[0px_-80px]"
              >
                brunch
              </a>
            </h1>
          </div>
          <div className="float-right">
            <div>
              <button
                className="leading-none overflow-hidden 
              indent-[-999px] inline-block h-[22px] w-[22px] 
              bg-[-30px_0px] bg-ico-brunch-sub float-right align-middle ml-[16px]"
              >
                검색
              </button>
            </div>
          </div>
          <div className="float-right">
            <a
              href="#"
              className="text-[#666] leading-[28px] w-[64px] h-[28px]
              border boder-solid border-[#959595] text-center float-right mt-[-5px]
              rounded-[16px] text-[12px] opacity-90 font-sans
            "
            >
              시작하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
