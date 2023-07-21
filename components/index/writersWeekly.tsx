'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { regexInvalidQuery } from '@/lib/utils'
import qs from 'qs'
import type { users } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import defaultProfile from '@/public/default.jpg'

function getRandomElementExcept(arr: string[], except: string) {
  const filteredArr = arr.filter((el) => el !== except)
  const randomIndex = Math.floor(Math.random() * filteredArr.length)
  return filteredArr[randomIndex]
}

const getFilterdUrl = (tag: string) => {
  const queryTags = qs.stringify(
    {
      fields: ['username', 'introduction', 'job', 'tags'],
      populate: {
        profile: {
          fields: ['url'],
        },
      },
      filters: {
        tags: { $contains: tag },
      },
      start: 0,
      limit: 6,
    },
    {
      encodeValuesOnly: true,
    },
  )
  return queryTags
}

const tags = ['사랑', '여행', '가족']
const initialState = tags.reduce(
  (pre: { [key: string]: boolean }, cur: string) => {
    pre[cur] = false
    return pre
  },
  {},
)
function AuthorsGroup({
  tag,
  tagsState,
}: {
  tag: string
  tagsState: typeof initialState
}) {
  const query = getFilterdUrl(tag)
  const { data: users }: { data: users | undefined } = useSWR(
    regexInvalidQuery.test(query) ? null : 'users?' + query,
  )

  if (!users) return null

  return (
    <ul
      className={`${
        !tagsState[tag]
          ? 'hidden'
          : 'after:content-[""] after:block after:clear-both'
      }`}
    >
      {users.map((user) => (
        <li
          key={user.id}
          className="float-left h-full mb-[15px] relative text-center w-[310px]"
        >
          <Link
            href={`/${user.id}`}
            className="bg-[#fff] block min-h-[288px] py-[46px] px-[40px]"
          >
            <Image
              src={user.profile ? user.profile.url : defaultProfile}
              alt={user.username}
              width={80}
              height={80}
              className="m-auto rounded-full"
            />
            <strong className="font-serif_mj tit_writer block overflow-hidden text-ellipsis">
              {user.username}
            </strong>
            <span
              className="text-[#666] block overflow-hidden
                      font-thin mt-[4px] tracking-[-.02em] 
                      text-ellipsis whitespace-nowrap text-[12px]"
            >
              {user.job}
            </span>
            <span
              className="block h-[60px] text-[#959595] overflow-hidden
                      text-[12px] leading-[20px] mt-[16px]  
                      text-ellipsis break-all"
            >
              {user.introduction}
            </span>
          </Link>
          {/* weekly_writer_tags */}
          <div className="absolute w-full bottom-[46px] mt-[43px] text-center">
            <button
              className="border border-[#ddd] rounded-[20px] text-[#959595]
                      text-[12px] tracking-[-1px] py-[4px] px-[10px] 
                      inline-block leading-[18px] mx-[2px] overflow-hidden"
            >
              {tag}
            </button>
            <button
              className="border border-[#ddd] rounded-[20px] text-[#959595]
                      text-[12px] tracking-[-1px] py-[4px] px-[10px] 
                      inline-block leading-[18px] mx-[2px] overflow-hidden"
            >
              {getRandomElementExcept(user.tags!, tag)}
            </button>
            <button
              className="h-[28px] w-[35px] rounded-[20px] indent-[-9999px] 
                      mx-[2px] bg-ico-brunch-main bg-[-280px_-70px]"
            >
              더보기
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function WritersWeekly() {
  const [tagsState, setTagsState] = useState({
    ...initialState,
    [tags[0]]: true,
  })
  return (
    <>
      <div className="bg-[#fafafa] my-[150px] mx-auto pt-[100px] overflow-hidden">
        <h3
          className="m-auto w-[258px] h-[13px] bg-brunch-text 
                    bg-[0px_-175px] txt-brunch"
        >
          BRUNCH WRITERS
        </h3>
        <p className="m-auto">
          <span
            className="block txt-brunch mt-[15px] mx-auto w-[84px] h-[11px] 
                    bg-brunch-text bg-[-270px_-70px]"
          >
            브런치 추천 작가
          </span>
        </p>
        {/* writer_keyword_btn */}
        <div className="mt-[43px] text-center">
          {tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setTagsState({ ...initialState, [tag]: true })}
              type="button"
              className={`bg-white border rounded-[25px] inline-block
                    font-noto_sans_demlight text-[15px] leading-[18px] mx-[2px]
                    overflow-hidden p-[7px_16px_6px] outline-none cursor-pointer
                   ${
                     tagsState[tag]
                       ? 'text-[#00c6be] border-[#00c6be]'
                       : 'text-[#959595] border-[#eee]'
                   }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* writer_keyword_writers */}
        <div
          className={`w-[960px] mx-auto mt-[50px] mb-[85px] 
                  font-noto_sans_demlight`}
        >
          {tags.map((tag, i) => (
            <AuthorsGroup key={i} tag={tag} tagsState={tagsState} />
          ))}
        </div>
      </div>
      <a href="#" className="block w-[960px] mt-[97px] mx-auto">
        <Image
          src={'https://i.ibb.co/RzDjwS8/brunch-apply.png'}
          alt={'brunch-apply'}
          width={960}
          height={200}
          className="w-full block"
        />
      </a>
    </>
  )
}
