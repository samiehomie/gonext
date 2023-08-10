import type { users } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import defaultProfile from '@/public/default.jpg'
import { getUsersFilteredQuery } from '@/lib/queries'
import fetchJson from '@/lib/fetchJson'
import TopTabs from './topTabs'

function getRandomElementExcept(arr: string[], except: string) {
  const filteredArr = arr.filter((el) => el !== except)
  const randomIndex = Math.floor(Math.random() * filteredArr.length)
  return filteredArr[randomIndex]
}
const tags = ['사랑', '여행', '가족']
const initialState = tags.reduce(
  (pre: { [key: string]: boolean }, cur: string) => {
    pre[cur] = false
    return pre
  },
  {}
)

async function AuthorsGroup({
  tag,
  tagIndex
}: {
  tag: string
  tagIndex: number
}) {
  const query = getUsersFilteredQuery(tag)

  const users = await fetchJson<users>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users?` + query
  )

  return (
    <ul
      id={`tab-${tagIndex}`}
      className={`after:content-[""] after:block after:clear-both ${
        tagIndex !== 0 && 'hidden'
      }`}
    >
      {users.map((user) => {
        const anotherTag = getRandomElementExcept(user.tags!, tag)
        return (
          <li
            key={user.id}
            className="float-left h-full mb-[15px] relative text-center w-[310px]"
          >
            <Link
              href={`/user/${user.id}`}
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
              <Link
                href={`/keyword/user/${tag}`}
                className="border border-[#ddd] rounded-[20px] text-[#959595]
                      text-[12px] tracking-[-1px] py-[4px] px-[10px] align-middle
                      inline-block leading-[18px] mx-[2px] overflow-hidden"
              >
                {tag}
              </Link>
              <Link
                href={`/keyword/user/${anotherTag}`}
                className="border border-[#ddd] rounded-[20px] text-[#959595]
                      text-[12px] tracking-[-1px] py-[4px] px-[10px] align-middle
                      inline-block leading-[18px] mx-[2px] overflow-hidden"
              >
                {anotherTag}
              </Link>
              <Link
                href={`/user/${user.id}`}
                className="h-[28px] w-[35px] rounded-[20px] indent-[-9999px] 
                      mx-[2px] bg-ico-brunch-main bg-[-280px_-70px] inline-block"
              >
                더보기
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default async function WritersWeekly() {
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
        <TopTabs tags={tags} />
        {/* writer_keyword_writers */}
        <div
          className={`w-[960px] mx-auto mt-[50px] mb-[85px] 
                  font-noto_sans_demlight`}
        >
          {tags.map((tag, i) => (
            <AuthorsGroup key={i} tag={tag} tagIndex={i} />
          ))}
        </div>
      </div>
      <a
        href={process.env.NEXT_PUBLIC_TEMP}
        className="block w-[960px] mt-[97px] mx-auto"
      >
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
