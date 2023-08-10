'use client'
import Link from 'next/link'
import type { user } from '@/types'
import Image from 'next/image'
import useFollower from '@/lib/useFollower'

export default function UserCard({
  user,
  index,
  keyword
}: {
  user: user
  index: number
  keyword: string
}) {
  const { followers } = useFollower({ userId: user.id })
  const tags = user.tags!
  const keywordIndex = tags.indexOf(keyword)
  tags.splice(keywordIndex, 1)
  tags.unshift(keyword)

  if (!followers) return null

  return (
    <li>
      <div
        className={`bg-white box-border shadow-[0px_1px_0px_0px_#eee] w-[460px] animation-up-50
                  float-left h-[206px] mb-[20px] p-[24px_20px] relative ${
                    index % 2 === 0 && 'ml-[20px]'
                  }`}
      >
        <div className="min-h-[100px]">
          <Link
            href={`/user/${user.id}`}
            className="rounded-[40px] h-[80px] w-[80px] overflow-hidden bg-ico-brunch-sub3 align-top 
                      bg-no-repeat inline-block leading-none bg-[-270px_-100px]
                      absolute right-[20px] top-[24px]"
          >
            {user.profile && (
              <Image
                src={user.profile.formats.thumbnail.url}
                alt={user.username}
                width={80}
                height={80}
              />
            )}
          </Link>
          <Link
            href={`/user/${user.id}`}
            className="block m-[0px_100px_0px_0px]"
          >
            <span className="font-noto_sans_light text-[14px]">
              <strong
                className="font-normal block text-[20px] text-ellipsis whitespace-nowrap
                          leading-[22px] max-w-[320px] min-h-[27px] overflow-hidden pt-[1px] text-[#333]"
              >
                {user.username}
              </strong>
              <span
                className="line-clamp-2 block text-[#909090] max-h-[42px] p-[10px_0px_0px] 
                          text-ellipsis break-all"
              >
                {user.introduction}
              </span>
            </span>
          </Link>
          <div className="text-[#959595] text-[12px] font-noto_sans_light p-[7px_0px_0px]">
            <em className="font-normal not-italic">글 수 </em>
            {user.writings ? user.writings.length : 0}
            <span className="w-[2px] h-[2px] align-top inline-block bg-[#ddd] m-[8px_5px_0px]" />
            <em className="font-normal not-italic">구독자 수 </em>
            {followers.data ? followers.data.length : 0}
          </div>
        </div>
        <div className="w-full p-[30px_0px_0px] text-left h-[28px] m-auto overflow-hidden">
          <div className="inline-block">
            <div className="w-auto inline-block float-left relative">
              {tags.slice(0, 6).map((tag, i) => {
                return (
                  <Link
                    key={i}
                    href={`/keyword/user/${tag}`}
                    className={`font-noto_sans_light bg-white border border-[#ddd] rounded-[14px]
                                float-left text-[12px] whitespace-nowrap p-[4px_10px] m-[0px_8px_8px_0px] ${
                                  i === 0 ? 'text-[#00c6be]' : 'text-[#959595]'
                                }`}
                  >
                    {i === 5 ? (
                      <span
                        className="bg-ico-brunch-sub2 bg-[-130px_0px] h-[3px] w-[15px] m-[8px_0px_0px] 
                                    inline-block leading-none overflow-hidden indent-[-9999px] align-top"
                      >
                        더보기
                      </span>
                    ) : (
                      tag
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
