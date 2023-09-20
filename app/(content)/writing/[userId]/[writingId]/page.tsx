import { Suspense } from 'react'
import { getQueryWritingPage, queryUser } from '@/lib/queries'
import type { user, users, writingsInUser, writingInUser } from '@/types'
import Markdown from '@/components/Markdown'
import Image from 'next/image'
import { getEnglishDate } from '@/lib/utils'
import bottomBanner from '@/public/bottom-banner.png'
import Link from 'next/link'
import TopNavigation from '@/components/navigations/topNavigation'
import ScrollIndicator from '@/components/navigations/scrollIndicator'
import CommentContainer from '../../{components)/commentContainer'
import fetchJson from '@/lib/fetchJson'
import defaultCover from '@/public/default-cover.png'
import { dressUpMarkdown } from '@/lib/utils'
import Profile from '../../{components)/profile'
import type { Metadata, ResolvingMetadata } from 'next'
import { Graph } from 'schema-dts'

type Props = {
  params: { userId: string; writingId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { userId, writingId } = params
  const [target, _] = getQueryWritingPage(userId, writingId)
  const user = await fetchJson<user>(target, {
    next: { tags: [`writing_${writingId}`] }
  })

  return {
    title: user.writings![0].title,
    description: user.writings![0].content,
    // openGraph: {
    //   images: [user.writings![0].cover?.url!, '/default-cover.png']
    // }
  }
}

async function Others({
  userId,
  writingId,
  userName
}: {
  userId: string
  writingId: string
  userName: string
}) {
  const [_, others] = getQueryWritingPage(userId, writingId)
  const otherWritings: user = await fetch(others).then((res) => res.json())
  const writings: writingsInUser = otherWritings.writings!
  const prev: undefined | writingInUser = writings
    .filter((w) => w.id < Number(writingId))
    .at(-1)
  const next: undefined | writingInUser = writings.filter(
    (w) => w.id > Number(writingId)
  )[0]
  return (
    <>
      <div
        className="bg-white relative z-[10] pb-[62px] 
                  before:bg-[#fbfbfb] before:content-[''] before:absolute before:w-full before:h-[75px]"
      >
        <strong className="screen-out leading-none absolute h-0 w-0">
          추천 브런치
        </strong>
        <ul
          className="m-auto relative w-[1020px] 
                after:content-[''] after:block after:clear-both"
        >
          {writings?.map((writing, i) => (
            <li
              key={writing.id}
              className={`float-left w-[300px] mx-[20px] mb-[35px] ${
                i % 3 === 0 && 'clear-both'
              }`}
            >
              <Link
                href={`/writing/${userId}/${writing.id}#title`}
                className="block"
              >
                <div className="relative w-full h-[170px]">
                  <Image
                    src={writing.cover ? writing.cover.url : defaultCover}
                    fill={true}
                    alt={writing.title}
                    className="object-cover top-0 left-0"
                  />
                </div>
                <strong
                  className="txt-writer font-serif_mj font-normal overflow-hidden text-[24px] 
                        leading-[32px] mt-[26px] max-h-[62px] text-ellipsis text-[#333]"
                >
                  {writing.title}
                </strong>
                <span
                  className="vertical-three-box text-[13px] mt-[8px] 
                        overflow-hidden text-ellipsis max-h-[66px]"
                >
                  <span className="relative leading-[24px] inline text-[#959595] text-[13px]">
                    {dressUpMarkdown(writing.content)}
                  </span>
                </span>
                <span className="block mt-[15px]">
                  <span className="mr-[2px] italic text-[12px] text-[#bbb] font-[Georgia]">
                    by
                  </span>
                  <span className="text-[13px] text-[#959595]">{userName}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* bottom promotion banner */}
      <div className="bg-[#75beff] relative min-w-[1020px] mb-[60px]">
        <a
          href={process.env.NEXT_PUBLIC_TEMP!}
          className="block m-auto w-[700px]"
        >
          <Image
            src={bottomBanner}
            alt={'하단 배너'}
            width={700}
            height={300}
          />
        </a>
      </div>
      {/* bottom navigation */}
      <div className="bg-white w-full z-[100] fixed bottom-0 h-[59px] border-t border-[#eee]">
        {prev && (
          <Link
            href={`/writing/${userId}/${prev.id}#title`}
            className="float-left h-full px-[30px]"
          >
            <span
              className="float-left mt-[-1px] mr-[13px] leading-[60px] 
                      text-[12px] text-[#959595]"
            >
              매거진의 이전글
            </span>
            <strong
              className="inline-block text-[15px] font-normal 
                      leading-[60px] overflow-hidden max-w-[350px] text-ellipsis whitespace-nowrap"
            >
              {prev.title}
            </strong>
          </Link>
        )}
        {next && (
          <Link
            href={`/writing/${userId}/${next.id}#title`}
            className="float-right h-full px-[30px]"
          >
            <span
              className="float-right mt-[-1px] ml-[13px] leading-[60px] 
                    text-[12px] text-[#959595]"
            >
              매거진의 다음글
            </span>
            <strong
              className="inline-block text-[15px] font-normal 
                    leading-[60px] overflow-hidden max-w-[350px] text-ellipsis whitespace-nowrap"
            >
              {next.title}
            </strong>
          </Link>
        )}
      </div>
    </>
  )
}

export default async function Page({
  params: { userId, writingId }
}: {
  params: { userId: string; writingId: string }
}) {
  const [target, _] = getQueryWritingPage(userId, writingId)
  const user = await fetchJson<user>(target, {
    next: { tags: [`writing_${writingId}`] }
  })

  if (!user || !user.writings) return null

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: user.writings![0].title,
        description: user.writings![0].content,
        datePublished: user.writings![0].publishedAt,
        author: {
          '@type': 'Person',
          name: user.username
        }
      },
      {
        '@type': 'Person',
        name: user.username,
        url: `${process.env.NEXT_PUBLIC_FRONT_URL}/user/${user.id}`,
        image: user.profile!.url
      },
      {
        '@type': 'Organization',
        name: 'Next brunch',
        url: process.env.NEXT_PUBLIC_FRONT_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_FRONT_URL}/bc-favicon.ico`,
          width: '64',
          height: '64'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNavigation>
        <ScrollIndicator />
      </TopNavigation>
      <div className="font-noto_sans_demlight">
        {/* wrap cover */}
        <div className="min-w-[1020px] break-words text-[14px] font-noto_sans_demlight">
          <div className="fixed top-0 w-full z-0">
            {/* Cover image */}
            <div className="relative w-full h-[450px]">
              {user.writings[0].cover ? (
                <Image
                  priority
                  src={user.writings[0].cover?.url as string}
                  alt={user.writings[0].title as string}
                  fill={true}
                  className=" object-cover"
                />
              ) : (
                <div className="bg-white absolute left-0 top-0 w-full h-[450px]" />
              )}

              <div className="h-[450px] absolute w-full left-0 top-0 bg-black opacity-30"></div>
              {/* Title */}
              <div
                className="absolute w-[700px] right-[50%] bottom-0 z-[11] 
                        text-left translate-x-[50%] translate-y-[-96px] text-[#fff]"
              >
                <h1
                  id="title"
                  className=" text-[34pt] font-serif_mj 
                            leading-[40pt] tracking-[-.01em] break-words"
                >
                  {user.writings[0].title}
                </h1>
                <p
                  className="tracking-[-.03em] text-[12pt] leading-[18pt] 
                          opacity-80 break-words pt-[6px]"
                >
                  {user.writings[0].subtitle}
                </p>
              </div>
              <div
                className="absolute w-[700px] bottom-[27px] right-[50%] text-[12px] 
                        translate-x-[50%] translate-y-[1px]"
              >
                <span
                  className="inline-block mr-[2px] text-[#fff] text-[12px] 
                          italic h-[14px] w-[15px] opacity-50 float-left font-[Georgia]"
                >
                  by
                </span>
                <span className="opacity-80 float-left text-[#666]">
                  <Link
                    href={`/user/${userId}`}
                    className="text-[#fff] tracking-[-.05em]"
                  >
                    {user.username}
                  </Link>
                </span>
                <span
                  className="bg-white float-left w-[2px] h-[2px] align-top 
                            inline-block opacity-50 mt-[8px] mx-[7px]"
                ></span>
                <span
                  className="opacity-50 float-left text-[#fff] 
                          wordspacing-60 tracking-[-.05em] font-sans"
                >
                  {getEnglishDate(user.writings[0].created as string)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="mt-[450px] bg-white relative">
          <div
            className="mb-[-5px] bg-white relative z-[10] pt-[40px] 
                    break-words overflow-hidden"
          >
            <Markdown content={user.writings[0].content as string} />
          </div>
          {/* tags */}

          <CommentContainer writingId={writingId} userId={userId} user={user} />
        </div>
        {/* profile */}
        <Profile user={user} />
        {/* others */}
        <Suspense fallback={<div>Loading...</div>}>
          <Others
            userId={userId}
            writingId={writingId}
            userName={user.username}
          />
        </Suspense>
      </div>
    </>
  )
}

export const revalidate = 1800

export async function generateStaticParams() {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${queryUser}`
  const users: users = await fetch(reqUrl).then((res) => res.json())
  const writings = users.flatMap((user) => user.writings)
  return writings.map((writing) => ({
    userId: `${writing?.user.id}`,
    writingId: `${writing?.id}`
  }))
}
