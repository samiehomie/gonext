import { getQueryWritingPage } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import type { author } from '@/types'
import Markdown from '@/components/Markdown'
import Image from 'next/image'
import { getEnglishDate } from '@/lib/utils'

export default async function Page({
  params: { userId, writingId },
}: {
  params: { userId: string; writingId: string }
}) {
  const [target, others] = getQueryWritingPage(userId, writingId)
  const author: author = await getData(target)
  const otherWritings: author = await getData(others)
  return (
    <div>
      {/* wrap cover */}
      <div className="min-w-[1020px] break-words text-[14px] font-noto_sans_light">
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
      </div>
    </div>
  )
}
