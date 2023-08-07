'use client'
import Image from 'next/image'
import icoCheck from '@/public/ico-check.png'
import icoPlus from '@/public/ico-plus.png'
import fetchJson from '@/lib/fetchJson'
import type { userSession } from '@/types'
import { useState } from 'react'
import useFollowing from '@/lib/useFollowing'
import useFollower from '@/lib/useFollower'
import { revalidateTagAction } from '@/lib/actions'

export default function SubscribeButton({
  subscribed,
  userMe,
  targetUserId,
  isBig = false
}: {
  subscribed: boolean
  userMe: userSession
  targetUserId: number

  isBig?: boolean
}) {
  const { mutatefollowings, reqUrl: reqUrlFwi } = useFollowing({
    subscriptionId: userMe.subscription
  })
  const { mutatefollowers, reqUrl: reqUrlFwr } = useFollower({
    userId: targetUserId
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(subscribed)

  if (userMe.id === targetUserId) return null

  async function subscribe(on: boolean) {
    setIsLoading(true)
    await revalidateTagAction(`follower_${targetUserId}`)
    await fetchJson(
      `${process.env.NEXT_PUBLIC_DB_URL}/api/subscriptions/${userMe.subscription}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userMe.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            targets: {
              [on ? 'connect' : 'disconnect']: [targetUserId]
            }
          }
        })
      }
    )
    mutatefollowings(await fetchJson(reqUrlFwi), false)
    mutatefollowers(await fetchJson(reqUrlFwr), false)
    setIsLoading(false)
    setIsSubscribed(on)
  }

  if (isSubscribed && userMe.isLoggedIn) {
    return (
      <button
        onClick={() => subscribe(false)}
        disabled={isLoading}
        className={`bg-[#00c6be] text-white group opacity-90 box-border 
                         ${
                           isBig
                             ? `w-[88px] rounded-[21px] text-[14px] h-[42px] leading-[41px] float-left ml-[10px] inline-block
                                min-w-[80px] text-center align-top`
                             : 'rounded-[50px] text-[13px] leading-[32px] float-right w-[80px] h-[32px] block mt-[5px]'
                         }`}
      >
        <span
          className={`${
            !isBig && 'pt-[1px] leading-[32px]'
          } group-hover:hidden`}
        >
          <Image
            src={icoCheck}
            height={17}
            width={17}
            alt="check"
            className={`align-sub  inline-block ${
              isBig ? 'mr-[2px]' : 'mr-[3px]'
            }`}
          />
          구독중
        </span>
        <span
          className={`hidden group-hover:inline-block ${
            isBig ? 'leading-[41px]' : 'pt-[1px] leading-[32px]'
          }`}
        >
          구독 취소
        </span>
      </button>
    )
  }
  return (
    <button
      disabled={isLoading}
      onClick={() => subscribe(true)}
      className={`bg-white text-[#00c6be] border border-[#00c6be] opacity-90 box-border 
                         ${
                           isBig
                             ? `w-[88px] rounded-[21px] text-[14px] h-[42px] leading-[41px] float-left ml-[10px] inline-block
                                min-w-[80px] text-center align-top`
                             : 'rounded-[50px] text-[13px] leading-[32px] float-right w-[80px] h-[32px] block mt-[5px]'
                         }`}
    >
      <span className={`${!isBig && 'pt-[1px] leading-[32px]'}`}>
        <Image
          src={icoPlus}
          height={17}
          width={17}
          alt="plus"
          className={`align-sub  inline-block ${
            isBig ? 'mr-[2px]' : 'mr-[3px]'
          }`}
        />
        구독
      </span>
    </button>
  )
}
