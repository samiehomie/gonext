'use client'
import { subscribers, subscription, userSession } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import SubscribeButton from '../../../../components/buttons/subscribeButton'
import { confirmSubscription, checkType } from '@/lib/utils'

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
  if (checkType(subscribersData)) {
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
                    {follower.attributes.subscriber.data.attributes.profile
                      ?.data && (
                      <Image
                        src={
                          follower.attributes.subscriber.data.attributes.profile
                            ?.data.attributes.formats.thumbnail.url
                        }
                        alt={
                          follower.attributes.subscriber.data.attributes
                            .username
                        }
                        fill={true}
                      />
                    )}
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
                  <SubscribeButton
                    subscribed={subscribed}
                    userMe={user}
                    targetUserId={follower.attributes.subscriber.data.id!}
                  />
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
                    {follower.attributes.profile?.data && (
                      <Image
                        src={
                          follower.attributes.profile.data.attributes.formats
                            .thumbnail.url
                        }
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
                  <SubscribeButton
                    subscribed={subscribed}
                    userMe={user}
                    targetUserId={follower.id}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
