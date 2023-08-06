'use client'
import { subscribers, subscription, userSession } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import icoCheck from '@/public/ico-check.png'
import icoPlus from '@/public/ico-plus.png'

function confirmSubscription(subscription: subscription, followerId: number) {
  const followings = subscription?.data.attributes.targets.data
  console.log('followings', followings)

  if (!followings) return false

  return followings.findIndex((el) => el.id === followerId) !== -1
}

export default function Authors({
  title,
  subscribersData,
  user,
  followings
}: {
  title: string
  subscribersData: subscribers | subscription
  user: userSession
  followings: subscription
}) {
  if (Array.isArray(subscribersData.data)) {
    return (
      <div className="w-full font-noto_sans_demlight">
        <div>
          <strong
            className="bg-ico-bg-underbar bg-no-repeat bg-[50%_100%] text-[30px] block 
              font-normal text-center p-[95px_0px_35px]"
          >
            {title}{' '}
            <span className="text-[#00c6be] text-center text-[30px]">
              {subscribersData.data.length}
            </span>
            명
          </strong>
        </div>
        <div>
          <ul className="w-[700px] m-auto pt-[30px]">
            {subscribersData.data.map((follower) => {
              const subscribed = !user?.isLoggedIn
                ? false
                : confirmSubscription(
                    followings!,
                    follower.attributes.subscriber.data.id
                  )
              return (
                <li
                  key={follower.id}
                  className="w-full py-[30px] overflow-hidden border-b border-[#eee]"
                >
                  <Link
                    href={`/user/${follower.attributes.subscriber.data.id}`}
                    className="bg-ico-brunch-sub3 bg-[-70px_-210px] rounded-[42px] float-left h-[42px] w-[42px] relative 
                  inline-block leading-none overflow-hidden indent-[-9999px] align-top"
                  >
                    <Image
                      src={
                        follower.attributes.subscriber.data.attributes.profile
                          ?.data.attributes.url!
                      }
                      alt={
                        follower.attributes.subscriber.data.attributes.username
                      }
                      fill={true}
                    />
                  </Link>
                  <Link
                    href={`/user/${follower.attributes.subscriber.data.id}`}
                    className="float-left pl-[19px] w-[500px]"
                  >
                    <strong className="block text-[17px] font-normal leading-[22px] pt-[1px]">
                      {follower.attributes.subscriber.data.attributes.username}
                    </strong>
                    <span className="text-[#909090] block text-[13px] pt-[3px] break-all">
                      {
                        follower.attributes.subscriber.data.attributes
                          .introduction
                      }
                    </span>
                  </Link>
                  {user.id !== follower.attributes.subscriber.data.id && (
                    <button
                      className={`${
                        subscribed
                          ? `bg-[#00c6be] text-white group`
                          : 'bg-white text-[#00c6be] border border-[#00c6be]'
                      } opacity-90 w-[80px] h-[32px] float-right box-border
                      text-[13px] leading-[32px] mt-[5px] rounded-[50px] block`}
                    >
                      <span className="pt-[1px] leading-[32px] group-hover:hidden">
                        <Image
                          src={subscribed ? icoCheck : icoPlus}
                          height={17}
                          width={17}
                          alt="plus"
                          className="align-sub mr-[3px] inline-block"
                        />
                        {subscribed ? '구독중' : '구독'}
                      </span>
                      <span className="hidden pt-[1px] leading-[32px] group-hover:inline-block">
                        구독 취소
                      </span>
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full font-noto_sans_demlight">
        <div>
          <strong
            className="bg-ico-bg-underbar bg-no-repeat bg-[50%_100%] text-[30px] block 
                  font-normal text-center p-[95px_0px_35px]"
          >
            {title}{' '}
            <span className="text-[#00c6be] text-center text-[30px]">
              {subscribersData.data.attributes.targets.data.length}
            </span>
            명
          </strong>
        </div>
        <div>
          <ul className="w-[700px] m-auto pt-[30px]">
            {subscribersData.data.attributes.targets.data.map((follower) => {
              const subscribed = !user?.isLoggedIn
                ? false
                : confirmSubscription(followings!, follower.id)
              return (
                <li
                  key={follower.id}
                  className="w-full py-[30px] overflow-hidden border-b border-[#eee]"
                >
                  <Link
                    href={`/user/${follower.id}`}
                    className="bg-ico-brunch-sub3 bg-[-70px_-210px] rounded-[42px] float-left h-[42px] w-[42px] relative 
                      inline-block leading-none overflow-hidden indent-[-9999px] align-top"
                  >
                    {follower.attributes.profile && (
                      <Image
                        src={follower.attributes.profile.data.attributes.url}
                        alt={follower.attributes.username}
                        fill={true}
                      />
                    )}
                  </Link>
                  <Link
                    href={`/user/${follower.id}`}
                    className="float-left pl-[19px] w-[500px]"
                  >
                    <strong className="block text-[17px] font-normal leading-[22px] pt-[1px]">
                      {follower.attributes.username}
                    </strong>
                    <span className="text-[#909090] block text-[13px] pt-[3px] break-all">
                      {follower.attributes.introduction}
                    </span>
                  </Link>
                  {user.id !== follower.id && (
                    <button
                      className={`${
                        subscribed
                          ? `bg-[#00c6be] text-white group`
                          : 'bg-white text-[#00c6be] border border-[#00c6be]'
                      } opacity-90 w-[80px] h-[32px] float-right box-border
                  text-[13px] leading-[32px] mt-[5px] rounded-[50px] block`}
                    >
                      <span className="pt-[1px] leading-[32px] group-hover:hidden">
                        <Image
                          src={subscribed ? icoCheck : icoPlus}
                          height={17}
                          width={17}
                          alt="plus"
                          className="align-sub mr-[3px] inline-block"
                        />
                        {subscribed ? '구독중' : '구독'}
                      </span>
                      <span className="hidden pt-[1px] leading-[32px] group-hover:inline-block">
                        구독 취소
                      </span>
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
