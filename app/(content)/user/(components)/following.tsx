'use client'
import useUser from '@/lib/useUser'
import useFollowing from '@/lib/useFollowing'
import Authors from './authors'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

export default function Following({
  subscriptionId
}: {
  subscriptionId: number
}) {
  const router = useRouter()
  const { user } = useUser()
  const [isFloat, setIsFloat] = useState(false)
  const { followings: userFollowing } = useFollowing({
    subscriptionId: subscriptionId
  })
  const { followings: myFollowings } = useFollowing({
    subscriptionId: user?.subscription
  })

  const handlerDown = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll >= 400) {
      setIsFloat(true)
    }
  }, [])

  const handlerUp = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll < 400) {
      setIsFloat(false)
    }
  }, [])

  useEffect(() => {
    if (!isFloat) {
      window.addEventListener('scroll', handlerDown)
    } else {
      window.addEventListener('scroll', handlerUp)
    }
    return () => {
      window.removeEventListener('scroll', handlerDown)
      window.removeEventListener('scroll', handlerUp)
    }
  }, [isFloat, handlerDown, handlerUp])

  if (!user || !userFollowing) return null
  if (!myFollowings && user?.isLoggedIn) return null

  return (
    <>
      <div
        className={`w-full z-[10000] transition duration-300 ease-in ${
          !isFloat
            ? 'absolute h-[80px] top-0'
            : `fixed border-b border-[#ddd] h-[60px] bg-[hsla(0,0%,100%,.9)] box-border`
        }`}
      >
        <div
          className={`${
            !isFloat ? 'm-[30px_30px_0px]' : 'mt-[20px]'
          } mx-[30px]`}
        >
          <div
            className={`${
              !isFloat && 'hidden'
            } ml-[-70px] w-[140px] text-[#666] text-[17px] left-1/2 
                      tracking-[-1px] mt-[-3px] absolute text-center`}
          >
            <span>
              관심작가{' '}
              <span className="text-[#00c6be]">
                {userFollowing.data.attributes.targets.data.length}
              </span>
              명{' '}
            </span>
          </div>
          <div className="float-right">
            <div>
              <button
                onClick={() => router.back()}
                className="bg-ico-brunch-sub bg-[-90px_0px] inline-block w-[20px] h-[20px] 
                          leading-none overflow-hidden indent-[-9999px]"
              >
                이전 페이지로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
      <Authors
        title={'이 작가가 구독하는'}
        subscribersData={userFollowing}
        user={user!}
        followings={myFollowings!}
      />
      <div className="h-[2000px]"></div>
    </>
  )
}
