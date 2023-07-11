import { Suspense } from 'react'
import { getQueryWritingPage } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import type { author, writing, writings } from '@/types'
import Markdown from '@/components/Markdown'
import Image from 'next/image'
import { getEnglishDate } from '@/lib/utils'
import plusIco from '@/public/ico-plus.png'
import bottomBanner from '@/public/bottom-banner.png'
import Link from 'next/link'

// TODO: #5 Add anchor using rehype library

async function Others({
  authorId,
  writingId,
  authorName,
}: {
  authorId: string
  writingId: string
  authorName: string
}) {
  const [_, others] = getQueryWritingPage(authorId, writingId)
  const otherWritings: author = await getData(others)
  const writings: writings = otherWritings.data.attributes.writings!
  const prev: undefined | writing['data'] = writings.data
    .filter((w) => w.id < Number(writingId))
    .at(-1)
  const next: undefined | writing['data'] = writings.data.filter(
    (w) => w.id > Number(writingId),
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
          {writings?.data.map((writing) => (
            <li
              key={writing.id}
              className="float-left w-[300px] mx-[20px] mb-[35px]"
            >
              <Link href={`/${authorId}/${writing.id}`} className="block">
                <div className="relative w-full h-[170px]">
                  <Image
                    src={
                      writing.attributes.Cover?.data.attributes.url as string
                    }
                    fill={true}
                    alt={writing.attributes.Title}
                    className="object-cover top-0 left-0"
                  />
                </div>
                <strong
                  className="txt-writer font-serif_mj font-normal overflow-hidden text-[24px] 
                        leading-[32px] mt-[26px] max-h-[62px] text-ellipsis text-[#333]"
                >
                  {writing.attributes.Title}
                </strong>
                <span
                  className="vertical-three-box text-[13px] mt-[8px] 
                        overflow-hidden text-ellipsis max-h-[66px]"
                >
                  <span className="relative leading-[24px] inline text-[#959595] text-[13px]">
                    {writing.attributes.Content}
                  </span>
                </span>
                <span className="block mt-[15px]">
                  <span className="mr-[2px] italic text-[12px] text-[#bbb] font-[Georgia]">
                    by
                  </span>
                  <span className="text-[13px] text-[#959595]">
                    {authorName}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* bottom promotion banner */}
      <div className="bg-[#75beff] relative min-w-[1020px] mb-[60px]">
        <a href="#" className="block m-auto w-[700px]">
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
            href={`/${authorId}/${prev.id}`}
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
              {prev.attributes.Title}
            </strong>
          </Link>
        )}
        {next && (
          <Link
            href={`/${authorId}/${next.id}`}
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
              {next.attributes.Title}
            </strong>
          </Link>
        )}
      </div>
    </>
  )
}

export default async function Page({
  params: { authorId, writingId },
}: {
  params: { authorId: string; writingId: string }
}) {
  const [target, _] = getQueryWritingPage(authorId, writingId)
  const author: author = await getData(target)

  return (
    <div className="font-noto_sans_demlight">
      {/* wrap cover */}
      <div className="min-w-[1020px] break-words text-[14px] font-noto_sans_demlight">
        <div className="fixed top-0 w-full z-0">
          {/* Cover image */}
          <div className="relative w-full h-[450px]">
            <Image
              src={
                author.data.attributes.writings?.data[0].attributes.Cover?.data
                  .attributes.url as string
              }
              alt={
                author.data.attributes.writings?.data[0].attributes
                  .Title as string
              }
              fill={true}
              className=" object-cover"
            />
            <div className="h-[450px] absolute w-full left-0 top-0 bg-black opacity-30"></div>
            {/* Title */}
            <div
              className="absolute w-[700px] right-[50%] bottom-0 z-[11] 
                        text-left translate-x-[50%] translate-y-[-96px] text-[#fff]"
            >
              <h1
                className=" text-[34pt] font-serif_mj 
                            leading-[40pt] tracking-[-.01em] break-words"
              >
                {author.data.attributes.writings?.data[0].attributes.Title}
              </h1>
              <p
                className="tracking-[-.03em] text-[12pt] leading-[18pt] 
                          opacity-80 break-words pt-[6px]"
              >
                {author.data.attributes.writings?.data[0].attributes.Subtitle}
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
                <a href="#" className="text-[#fff] tracking-[-.05em]">
                  {author.data.attributes.Name}
                </a>
              </span>
              <span
                className="bg-white float-left w-[2px] h-[2px] align-top 
                            inline-block opacity-50 mt-[8px] mx-[7px]"
              ></span>
              <span
                className="opacity-50 float-left text-[#fff] 
                          wordspacing-60 tracking-[-.05em] font-sans"
              >
                {getEnglishDate(
                  author.data.attributes.writings?.data[0].attributes
                    .Created as string,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-[450px] pb-[54px] bg-white relative">
          <div
            className="mb-[-5px] bg-white relative z-[10] pt-[40px] 
                    break-words overflow-hidden"
          >
            <Markdown
              content={
                author.data.attributes.writings?.data[0].attributes
                  .Content as string
              }
            />
          </div>
          {/* tags */}
          <div>
            <div
              className="mt-[80px] mx-auto text-right w-[700px] 
                      after:content-[''] after:block after:clear-both"
            >
              <div className="float-left pt-[6px] bg-white overflow-hidden relative">
                <strong className="leading-none overflow-hidden indent-[-9999px] h-0 w-0 absolute">
                  keyword
                </strong>
                <ul className="float-left">
                  {author.data.attributes.writings?.data[0].attributes.Tags.map(
                    (tag, i) => (
                      <li
                        key={tag + i}
                        className="float-left mb-[8px] mr-[8px]"
                      >
                        <a href="#" className="writing-tag tracking-[-.5px]">
                          {tag}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <span className="inline-block ">
                <button className="comment-button">
                  <span
                    className="bg-ico-article-buttons bg-[0px_0px] bg-[length:80px_80px] 
                            h-[20px] w-[20px] mr-[3px] inline-block align-top"
                  ></span>
                  <span>댓글</span>
                  <span className="font-sf_light text-[#00c6be] ml-[3px]">
                    2
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* comment */}
      <div></div>
      {/* profile */}
      <div className="bg-[#fbfbfb] z-[10] relative pb-[80px] min-w-[1020px]">
        {/* pc profile */}
        <div className="w-[700px] relative m-auto pt-[31px]">
          <div>
            <strong className="block">
              <a
                href="#"
                className="block text-[28px] font-normal overflow-hidden 
                        font-noto_sans_demlight text-ellipsis whitespace-nowrap w-[588px]"
              >
                {author.data.attributes.Name}
              </a>
            </strong>
            <span className="text-[#666] block text-[13px] my-[1px] mx-[2px] font-noto_sans_demlight">
              <em className="screen-out absolute h-0 w-0">직업</em>
              {author.data.attributes.Job}
            </span>
            <Link href={'#'} className="absolute right-0 top-[-22px]">
              <Image
                src={
                  author.data.attributes.Profile?.data.attributes.url as string
                }
                alt={author.data.attributes.Name}
                width={100}
                height={100}
                className="rounded-full align-top"
              />
            </Link>
            <div className="text-[13px] text-[#666] mt-[21px]">
              <a href="#">
                <p className="text-[#959595] leading-[22px]">
                  {author.data.attributes.Introduction}
                </p>
              </a>
            </div>
            <div className="mt-[34px] after:content-[''] after:clear-both after:block">
              <a href="#" className="text-[14px]">
                <span className="text-[#666] float-left mt-[6px]">
                  <span>구독자</span>
                  <span className="text-[#666] ml-[4px] font-sf_light">12</span>
                </span>
              </a>
              <span className="float-right text-center">
                <button
                  className="bg-[#00c6be] border border-[#00c6be] rounded-[21px] 
                            text-white text-[14px] h-[42px] w-[86px] pt-[1px]"
                >
                  제안하기
                </button>
                <button
                  className="bg-white border border-[#00c6be] rounded-[21px] 
                            text-[#00c6be] text-[14px] h-[42px] w-[86px] pt-[1px] ml-[5px] opacity-90"
                >
                  <span>
                    <Image
                      src={plusIco}
                      alt="plus icon"
                      width={17}
                      height={17}
                      className="align-sub inline-block mr-[3px]"
                    />
                    구독
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* others */}
      <Suspense fallback={<div>Loading...</div>}>
        <Others
          authorId={authorId}
          writingId={writingId}
          authorName={author.data.attributes.Name}
        />
      </Suspense>
    </div>
  )
}
