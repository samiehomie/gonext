import Tag from '../tag'
import type { user } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import Writing from './writing'

// TODO: #7 Implement infinite loading

export default function Content({ userData }: { userData: user }) {
  const user = userData.username
  const userId = userData.id

  if (!userData.writings) return null

  return (
    <main>
      <div className="overflow-hidden font-noto_sans_demlight">
        <div id="author">
          <h3 className="screen-out">작가소개</h3>
          <div className="pt-[34px] m-auto w-[700px] animation-up">
            <strong className="block text-[12px] font-normal">소개</strong>
            <p className="text-[#666] text-[13px] leading-[24px] pt-[22px]">
              {userData.introduction}
            </p>
            <ul className="overflow-hidden pt-[13px]">
              {userData.tags &&
                userData.tags.map((tag, index) => (
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
              {userData.writings.map((writing) => (
                <Writing key={writing.id} userId={userId} writing={writing} />
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
            {userData.books?.map((book) => (
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
                    src={book.cover?.url as string}
                    fill={true}
                    alt={book.title}
                    className="rounded-[2px_6px_6px_2px]"
                  />
                  <div className="bg-white h-[160px] mx-[46px] relative z-[1]">
                    <strong
                      className="text-left p-[8px_12px_0px] max-h-[115px] leading-[24px] 
                                font-normal text-[17px] text-[#666] word-wrap-break display-box break-keep"
                    >
                      {book.title}
                    </strong>
                    <span
                      className="txt-writer bottom-[10px] box-border text-[#959595] text-[11px] 
                                left-0 leading-[16px] max-h-[32px] p-[0px_16px_0px_12px] absolute w-full 
                                text-ellipsis text-left overflow-hidden break-all"
                    >
                      {user}
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
                  <span>{book.title}</span>
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
                      {book.writings?.length}
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
