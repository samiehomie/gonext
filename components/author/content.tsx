import Tag from '../tag'
import type { author } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { getEnglishDate } from '@/lib/utils'
// TODO: #7 Implement infinite loading

export default function Content({ authorData }: { authorData: author }) {
  const author = authorData.data.attributes.Name
  const authorId = authorData.data.id
  return (
    <main>
      <div className="overflow-hidden font-noto_sans_demlight">
        <div id="author">
          <h3 className="screen-out">작가소개</h3>
          <div className="pt-[34px] m-auto w-[700px] animation-up">
            <strong className="block text-[12px] font-normal">소개</strong>
            <p className="text-[#666] text-[13px] leading-[24px] pt-[22px]">
              {authorData.data.attributes.Introduction}
            </p>
            <ul className="overflow-hidden pt-[13px]">
              {authorData.data.attributes.Tags.map((tag, index) => (
                <li key={`${tag + index}`} className="float-left mr-[8px]">
                  <Tag tagName={tag} />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="pb-[100px] m-auto w-[700px] pt-[56px] animation-up 
                      after:block after:clear-both after:content-['']"
          >
            <a
              href="#"
              className="border border-[#bbb] rounded-[20px] text-[#666] pt-[8px] pb-[6px]
                        float-right text-[13px] leading-[16px] mt-[31px] w-[130px] text-center"
            >
              작가에게 제안하기
            </a>
          </div>
        </div>
        <div
          id="writings"
          className="m-auto overflow-hidden w-[700px] p-[0px_120px_100px]"
        >
          <h3 className="screen-out">글목록</h3>
          <div className="overflow-hidden">
            <ul className="mt-[7px]">
              {authorData.data.attributes.writings?.data.map((writing) => (
                <li
                  key={writing.id}
                  className="relative border-b border-[#eee] p-[24px_0px_27px] animation-up"
                >
                  {writing.attributes.book?.data !== null && (
                    <Link
                      href={`/book/${writing.attributes.book?.data.id}`}
                      className=" inline-block text-[13px] m-[3px_0px_11px] align-top text-[#00c6be]"
                    >
                      <em
                        className="not-italic font-normal border-b border-[#00c6be] 
                                  inline-block leading-[14px] min-w-[20px]"
                      >
                        {writing.attributes.book?.data.attributes.Title}
                      </em>
                    </Link>
                  )}
                  <Link
                    href={`/${authorId}/${writing.id}`}
                    className="min-h-[112px] overflow-visible clear-both block 
                              after:block after:clear-both after:content-['']"
                  >
                    <strong className="text-[20px] font-normal tracking-[-1px] whitespace-nowrap">
                      {writing.attributes.Title}
                    </strong>
                    <div className="mt-[5px] overflow-hidden absolute right-0 top-[25px] w-[120px] h-[120px]">
                      <Image
                        src={
                          writing.attributes.Cover?.data.attributes.formats
                            .small.url as string
                        }
                        alt={writing.attributes.Title}
                        fill={true}
                        className="object-cover"
                      />
                    </div>
                    <div className="w-[540px]">
                      <div
                        className="line-clamp-2 text-[14px] leading-[21px] max-h-[43px] 
                                  overflow-hidden pt-[5px] text-ellipsis"
                      >
                        <em className="not-italic font-normal text-[#666] pt-[6px]">
                          {writing.attributes.Subtitle}
                        </em>
                        <span className="w-[1px] align-top h-[12px] inline-block bg-[#eee] m-[4px_3px_0px]"></span>
                        <span className="word-wrap-break break-words text-[#959595]">
                          {writing.attributes.Content.slice(0, 200)}
                        </span>
                      </div>
                    </div>
                    <span className=" whitespace-nowrap text-[#959595] block text-[12px] overflow-hidden pt-[21px]">
                      <span className="float-left">댓글</span>
                      <span className="float-left">0</span>
                      <span className="float-left bg-[#ddd] inline-block h-[2px] w-[2px] align-top m-[9px_5px_0px_6px]"></span>
                      <span className="float-left text-[#959595]">
                        {getEnglishDate(writing.attributes.publishedAt)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          id="books"
          className="m-auto min-h-[400px] relative w-[700px] pb-[100px]"
        >
          <h3 className="screen-out">매거진</h3>
          <div className="w-[735px] leading-none text-[0px]">
            {authorData.data.attributes.books?.data.map((book) => (
              <div
                key={book.id}
                className="mt-[38px] inline-block w-[210px] align-top relative 
                          min-h-[398px] mr-[35px] animation-up"
              >
                <Link
                  href={`/book/${book.id}`}
                  className=" bg-white box-border block h-[300px] relative w-[210px] 
                              pt-[63px] rounded-[2px_6px_6px_2px]"
                >
                  <Image
                    src={book.attributes.Cover?.data.attributes.url as string}
                    fill={true}
                    alt={book.attributes.Title}
                    className="rounded-[2px_6px_6px_2px]"
                  />
                  <div className="bg-white h-[160px] mx-[46px] relative z-[1]">
                    <strong
                      className="text-left p-[8px_12px_0px] max-h-[115px] leading-[24px] 
                                font-normal text-[17px] text-[#666] word-wrap-break display-box break-keep"
                    >
                      {book.attributes.Title}
                    </strong>
                    <span
                      className="txt-writer bottom-[10px] box-border text-[#959595] text-[11px] 
                                left-0 leading-[16px] max-h-[32px] p-[0px_16px_0px_12px] absolute w-full 
                                text-ellipsis text-left overflow-hidden break-all"
                    >
                      {author}
                    </span>
                  </div>
                  <span
                    className="z-[10] absolute left-0 top-0 w-[9px] h-full
                before:content-[''] before:absolute before:top-0 before:right-[2px]
                before:w-[1px] before:h-full before:bg-[rgba(0,0,0,.08)]
                after:content-[''] after:absolute after:top-0 after:right-0
                after:w-[2px] after:h-full after:bg-[hsla(0,0%,100%,.1)]"
                  ></span>
                  <span
                    className={`font-sf_bold block absolute left-0 
                              w-full z-[1] text-center text-[#fff] text-[12px] 
                              bottom-[8px] leading-[18px]`}
                  >
                    brunch book
                  </span>
                  <span
                    className="absolute top-0 left-0 h-full block w-full
                              rounded-[2px_6px_6px_0px] bg-[rgba(0,0,0,.1)]"
                  ></span>
                </Link>
                <strong className="block font-normal pt-[20px] text-[11px] font-sf_bold leading-[15px] text-[#959595]">
                  brunch book
                </strong>
                <Link
                  href={`/book/${book.id}`}
                  className="txt-writer break-words overflow-hidden text-[18px] leading-[27px] max-h-[54px] pt-[4px]"
                >
                  <span>{book.attributes.Title}</span>
                </Link>
                <dl className="block pt-[6px]">
                  <dt className="inline-block align-top mt-[3px]">
                    <span
                      className="bg-ico-brunch-sub2 bg-[-100px_-370px] h-[13px] w-[13px] 
                                leading-none overflow-hidden indent-[-9999px] inline-block align-top"
                    >
                      전체글갯수
                    </span>
                  </dt>
                  <dd className="inline-block align-top text-[#959595] text-[12px] leading-[18px] pl-[2px]">
                    <em className="not-italic font-normal">
                      {book.attributes.writings?.data.length}
                    </em>
                    화
                  </dd>
                  <dt className="pl-[12px] inline-block align-top mt-[3px]">
                    <span
                      className="bg-ico-brunch-sub2 bg-[-140px_-370px] h-[13px] w-[13px] 
                                leading-none overflow-hidden indent-[-9999px] inline-block align-top"
                    >
                      라이킷
                    </span>
                  </dt>
                  <dd className="inline-block align-top text-[#959595] text-[12px] leading-[18px] pl-[2px]">
                    2
                  </dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
