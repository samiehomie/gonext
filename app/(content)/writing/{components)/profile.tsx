'use client'
import Image from 'next/image'
import { user } from '@/types'
import Link from 'next/link'
import { confirmSubscription } from '@/lib/utils'
import useUser from '@/lib/useUser'
import useFollowing from '@/lib/useFollowing'
import useFollower from '@/lib/useFollower'
import SubscribeButton from '@/components/buttons/subscribeButton'

export default function Profile({ user }: { user: user }) {
  const { followers } = useFollower({ userId: user.id })
  const { user: userMe } = useUser()
  const { followings, mutatefollowings } = useFollowing({
    subscriptionId: userMe?.subscription
  })

  if (!userMe || !followers) return null
  if (!followings && userMe?.isLoggedIn) return null

  const subscribed = followings
    ? confirmSubscription(followings, user.id)
    : false

  return (
    <div className="bg-[#fbfbfb] z-[10] relative pb-[80px] min-w-[1020px]">
      {/* pc profile */}
      <div className="w-[700px] relative m-auto pt-[31px]">
        <div>
          <strong className="block">
            <Link
              href={`/user/${user.id}`}
              className="block text-[28px] font-normal overflow-hidden 
                font-noto_sans_demlight text-ellipsis whitespace-nowrap w-[588px]"
            >
              {user.username}
            </Link>
          </strong>
          <span className="text-[#666] block text-[13px] my-[1px] mx-[2px] font-noto_sans_demlight">
            <em className="screen-out absolute h-0 w-0">직업</em>
            {user.job}
          </span>
          <Link
            href={`/user/${user.id}`}
            className="absolute right-0 top-[-22px]"
          >
            <Image
              src={user.profile?.url as string}
              alt={user.username}
              width={100}
              height={100}
              className="rounded-full align-top"
            />
          </Link>
          <div className="text-[13px] text-[#666] mt-[21px]">
            <Link href={`/user/${user.id}`}>
              <p className="text-[#959595] leading-[22px]">
                {user.introduction}
              </p>
            </Link>
          </div>
          <div className="mt-[34px] after:content-[''] after:clear-both after:block">
            <a href="#" className="text-[14px]">
              <span className="text-[#666] float-left mt-[6px]">
                <span>구독자</span>
                <span className="text-[#666] ml-[4px] font-sf_light">
                  {followers.data.length}
                </span>
              </span>
            </a>
            <span className="float-right text-center">
              {/* <button
            className="bg-[#00c6be] border border-[#00c6be] rounded-[21px] 
                    text-white text-[14px] h-[42px] w-[86px] pt-[1px]"
          >
            제안하기
          </button> */}
              <SubscribeButton
                subscribed={subscribed}
                userMe={userMe}
                targetUserId={user.id}
                isBig={true}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
