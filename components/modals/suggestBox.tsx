'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { getSearchQuery, regexInvalidQuery } from '@/lib/utils'
import useSWR from 'swr'
import type { writings, books, users } from '../../types'
import Image from 'next/image'
import { debounce } from 'lodash'
import { queryUsersFive } from '@/lib/queries'
import Link from 'next/link'

function SuggestList() {
  const { data: users }: { data: users | undefined } = useSWR(
    'users?' + queryUsersFive,
  )

  if (!users) return null

  return (
    <ul className="text-[0px] leading-none text-center w-[1000px] ml-[-30px]">
      {!users ? (
        <li></li>
      ) : (
        users.map((user) => (
          <li
            key={user.id}
            className="inline-block h-[198px] w-[140px] align-top mx-[30px]
                    suggest-list transition-all duration-1000 ease-in-out"
          >
            <Link href={`/${user.id}`} className="block">
              <Image
                src={user.profile?.url as string}
                alt={user.username}
                width={120}
                height={120}
                className="rounded-full m-auto block relative"
              />
              <strong
                className="block w-[140px] text-ellipsis leading-[1.5] 
                              overflow-hidden text-[#333] text-[15px] font-noto_sans_demlight 
                              whitespace-nowrap pt-[15px] font-extralight"
              >
                {user.username}
              </strong>
              <span
                className="txt-writer text-[#666] text-[12px] h-[38px] w-[140px] 
                            text-ellipsis text-center overflow-hidden leading-[1.5]"
              >
                {user.introduction}
              </span>
            </Link>
          </li>
        ))
      )}
    </ul>
  )
}

function SearchSide({ searchWord }: { searchWord: string }) {
  const { queryBooks, queryUsers } = getSearchQuery(searchWord)
  const {
    data: booksData,
  }: {
    data: books | undefined
  } = useSWR(regexInvalidQuery.test(queryBooks) ? null : 'books?' + queryBooks)

  const {
    data: usersData,
  }: {
    data: users | undefined
  } = useSWR(regexInvalidQuery.test(queryUsers) ? null : 'users?' + queryUsers)

  if (!booksData || !usersData) return null

  return (
    <div className="overflow-hidden w-[220px] text-[14px]">
      {/* suggest_search_toggle aside book */}
      <div className="float-left">
        <h3 className="text-[#959595] text-[13px] leading-none pt-[30px]">
          <a href="#">작품 검색</a>
          <span
            className="inline-block w-[10px] h-[10px] align-top 
                    mt-[2px] ml-[3px] bg-ico-brunch-sub2 bg-[-120px_0px]"
          ></span>
        </h3>
        {!booksData || booksData.data.length === 0 ? (
          <div className="pt-[8px] pb-[2px]">
            <div className="pt-[11px] max-h-[298px] overflow-hidden suggest-list">
              <span className="pb-[9px] block text-[#959595] text-[16px]">
                검색 결과가 없습니다.
              </span>
            </div>
          </div>
        ) : (
          booksData.data.map((book) => (
            <div className="pt-[8px] pb-[2px]" key={book.id}>
              <div className="pt-[11px] max-h-[298px] overflow-hidden suggest-list">
                <div className="relative pl-[50px]">
                  <Link
                    href={`/book/${book.id}`}
                    className="rounded-[4px] absolute h-[36px] w-[36px] left-0 top-0 overflow-hidden"
                  >
                    <Image
                      src={
                        book.attributes.cover?.data.attributes.formats.small
                          .url as string
                      }
                      alt={book.attributes.title}
                      width={36}
                      height={36}
                    />
                  </Link>
                  <div className="table table-fixed	w-full min-h-[36px] overflow-hidden">
                    <div className="table-cell align-middle">
                      <a
                        href="#"
                        className="block overflow-hidden leading-[1.3] text-ellipsis 
                                whitespace-nowrap text-[16px] w-[170px]"
                      >
                        {book.attributes.title}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* suggest_search_toggle aside writings */}
      <div className="float-left border-t border-[#efefef] mt-[22px]">
        <h3 className="text-[#959595] text-[13px] leading-none pt-[20px]">
          <a href="#">작가 검색</a>
          <span
            className="inline-block w-[10px] h-[10px] align-top 
                    mt-[2px] ml-[3px] bg-ico-brunch-sub2 bg-[-120px_0px]"
          ></span>
        </h3>
        {!usersData || usersData.length === 0 ? (
          <div className="pt-[8px] pb-[2px]">
            <div className="pt-[11px] max-h-[298px] overflow-hidden suggest-list">
              <span className="pb-[9px] block text-[#959595] text-[16px]">
                검색 결과가 없습니다.
              </span>
            </div>
          </div>
        ) : (
          usersData.map((user) => (
            <div className="pt-[8px] pb-[2px]" key={user.id}>
              <div className="pt-[11px] max-h-[298px] overflow-hidden suggest-list">
                <div className="relative pl-[50px]">
                  <Link
                    href={`/${user.id}`}
                    className="rounded-full absolute h-[36px] w-[36px] left-0 top-0 overflow-hidden"
                  >
                    <Image
                      src={user.profile?.formats.thumbnail.url as string}
                      alt={user.username}
                      width={36}
                      height={36}
                    />
                  </Link>
                  <div className="table table-fixed	w-full min-h-[36px] overflow-hidden">
                    <div className="table-cell align-middle">
                      <Link
                        href={`/${user.id}`}
                        className="block overflow-hidden leading-[1.3] text-ellipsis 
                                whitespace-nowrap text-[16px] w-[170px]"
                      >
                        {user.username}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SearchList({ searchWord }: { searchWord: string }) {
  const { queryWritings } = getSearchQuery(searchWord)
  const {
    data: writingData,
  }: {
    data: writings | undefined
  } = useSWR(
    regexInvalidQuery.test(queryWritings) ? null : 'writings?' + queryWritings,
  )

  if (!writingData) return null

  return (
    <div className="float-left w-[720px]">
      <h3 className="text-[#959595] text-[13px] leading-none pt-[30px]">
        <a href="#">글 검색</a>
        <span
          className="inline-block w-[10px] h-[10px] align-top 
                        mt-[2px] ml-[3px] bg-ico-brunch-sub2 bg-[-120px_0px]"
        ></span>
      </h3>
      <div className="pb-[2px]">
        <ul className="font-noto_sans_demlight">
          {!writingData || writingData.data.length === 0 ? (
            <div className="pb-[2px]">
              <div className="pt-[20px] max-h-[298px] overflow-hidden suggest-list">
                <span className="pb-[9px] block text-[#959595] text-[16px]">
                  검색 결과가 없습니다.
                </span>
              </div>
            </div>
          ) : (
            writingData.data.map((writing) => (
              <li key={writing.id} className="mt-[26px] box-border">
                <Link
                  href={`/${writing.attributes.user?.data.id}/${writing.id}`}
                >
                  <div className="max-w-[620px] overflow-hidden whitespace-nowrap text-ellipsis">
                    <strong
                      className="leading-none text-[20px] font-normal 
                      overflow-hidden whitespace-nowrap text-ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: writing.attributes.title.replaceAll(
                          searchWord,
                          `<b style="color: #00c6be; font-weight: normal">${searchWord}</b>`,
                        ),
                      }}
                    />
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default function SuggestBox({
  setOnSearch,
}: {
  setOnSearch: (onSearch: boolean) => void
}) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const onInput = debounce(function (e: FormEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement)
      setInputValue(e.target.value)
  }, 200)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className="box-border overflow-hidden pt-[275px] pb-[227px] 
                flex flex-col justify-center bg-white font-noto_sans_demlight
                fixed top-0 left-0 w-full h-full"
    >
      {/* box_suggest_inner */}
      <div className="h-[440px]">
        {/* search */}
        <div className="bg-white">
          <div className="relative w-[940px] m-auto border-b border-[#333]">
            <h2 className="screen-out">검색 키워드 입력창</h2>
            <div>
              <div>
                <span className="relative font-noto_sans_demlight">
                  <input
                    ref={inputRef}
                    type="text"
                    className="absolute z-[10] bg-transparent border-transparent 
                            text-[#333] text-[30px] w-[940px] outline-none tracking-[-1px]
                            border-0"
                    placeholder="검색어를 입력해 주세요."
                    maxLength={20}
                    autoComplete="off"
                    onChange={onInput}
                  />
                  <input
                    type="text"
                    className="text-transparent text-[30px] outline-none w-[940px] 
                              tracking-[-1px] border-0"
                    maxLength={20}
                    autoComplete="off"
                  />
                </span>
              </div>
              <button
                className={`absolute block bottom-0 right-0 w-[23px] h-[45px] overflow-hidden ${
                  inputValue && 'hidden'
                }`}
              >
                <span
                  className="block text-[0px] leading-none 
                  indent-[-9999px] w-[22px] h-[22px] bg-ico-brunch-sub bg-[-30px_0px]"
                >
                  검색
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* suggest */}
        <div className={`${inputValue && 'hidden'}`}>
          <div
            className="w-[949px] text-center mt-[65px] mb-0 mx-auto
                      suggest-list"
          >
            <p className="text-[#333] text-[28px] pb-[12px]">
              <b className="text-[#00c6be]">책</b>을 사랑하는 작가들을
              만나보세요.
            </p>
            <button className="suggest-tag">출간작가</button>
            <button className="suggest-tag">강사</button>
            <button className="suggest-tag">강연자</button>
          </div>
          <div className="w-[940px] overflow-hidden mt-[45px] mx-auto">
            <SuggestList />
          </div>
        </div>
        {/* suggest_search_toggle */}
        <div
          className={`${
            !inputValue && 'hidden'
          } m-auto w-[940px] overflow-hidden min-h-[395px]`}
        >
          <SearchList searchWord={inputValue} />
          <SearchSide searchWord={inputValue} />
        </div>
      </div>
      <button
        className="absolute block right-[32px] top-[31px]"
        onClick={() => {
          setOnSearch(false)
          document.body.classList.remove('brunch-suggest')
        }}
      >
        <span
          className="block text-[0px] leading-none 
                  indent-[-9999px] w-[20px] h-[20px] bg-ico-brunch-sub bg-[-90px_0px]"
        >
          닫기
        </span>
      </button>
    </div>
  )
}
