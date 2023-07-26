'use client'
import { useState, useEffect, useCallback, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GitHubIco from '../gitHubico'
import { startModalContext, startStateType } from '../userContext'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PageButton({
  page,
  role,
  handler,
}: {
  page: number
  role: number
  handler: (arg1: number, arg2: boolean) => void
}) {
  if (page === role) {
    return (
      <button
        onClick={() => handler(role, true)}
        className="inline-block w-[18px] h-[18px] 
                before:content-[''] before:inline-block before:h-[8px]
                before:w-[8px] before:rounded-full 
                before:bg-[#b2b2b2]"
      >
        <span className="screen-out">{role + 1}</span>
      </button>
    )
  }
  return (
    <button
      onClick={() => handler(role, true)}
      className="inline-block w-[18px] h-[18px] 
              before:content-[''] before:inline-block before:h-[8px]
              before:w-[8px] before:box-border before:rounded-full 
              before:border before:border-[#dedede]"
    >
      <span className="screen-out">{role}</span>
    </button>
  )
}

function StartItem({
  setOnStart,
  setDisabled,
}: {
  setOnStart: (arg: boolean) => void
  setDisabled: (arg: boolean) => void
}) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const isSignin = searchParams?.has('signin')

  useEffect(() => {
    if (isSignin) {
      setOnStart(true)
    }
  }, [isSignin, setOnStart])
  return (
    <div
      className="w-[50%] h-full inline-block box-border 
              bg-[#f8f8f8] p-[94px_47px_72px]"
    >
      <div className="pb-[49px] border-b border-[#e7e7e7]">
        <strong className="block text-[22px] leading-[22px] mb-[18px] font-normal">
          브런치스토리 시작하기
        </strong>
        <Link
          prefetch={false}
          href={`/api/auth/github?back=${pathName}`}
          className="bg-[#231F20] box-border rounded-[5px] text-[#333] block text-[16px] 
                      h-[60px] leading-[61px] mt-[14px] text-center w-full"
          onClick={() => setDisabled(true)}
        >
          <GitHubIco
            width={18}
            height={18}
            extraClass="inline-block relative top-[1px] left-[-5px] align-middle text-center"
          />
          <span
            className="inline-block relative top-[1px] right-[-2.5px] text-[#f8f8f8] 
                      text-[16px] leading-[61px] text-center"
          >
            GitHub 계정으로 로그인
          </span>
        </Link>
      </div>
      <div className="py-[40px]">
        <strong className="block font-normal text-[15px]">
          내 브런치스토리 찾기
        </strong>
        <a
          href="#"
          className="bg-[#fff] rounded-[5px] box-border text-[#333] 
                      block text-[16px] h-[60px] leading-[61px] mt-[14px] text-center w-full"
        >
          내 브런치스토리의 카카오계정을 모르겠어요
        </a>
        <a
          href="#"
          className="bg-[#fff] rounded-[5px] box-border text-[#333] 
                      block text-[16px] h-[60px] leading-[61px] mt-[14px] text-center w-full"
        >
          페이스북·트위터로만 로그인 했었나요?
        </a>
        <a
          href="#"
          className="block text-[#6c6c6c] text-[14px] mt-[57px] text-center underline"
        >
          로그인 관련 상세 도움말
        </a>
      </div>
      <button
        className="absolute right-[27px] top-[25px]"
        onClick={() => setOnStart(false)}
      >
        <span className="screen-out">창 닫기</span>
        <span
          className="bg-ico-brunch-sub2 bg-[-140px_-760px] inline-block 
                    align-top h-[23px] w-[23px]"
        ></span>
      </button>
    </div>
  )
}

export default function IndexStart() {
  const [page, setPage] = useState(0)
  const [onStart, setOnStart] = useContext(startModalContext) as startStateType
  const [disabled, setDisabled] = useState(false)

  const handlePage = useCallback(
    (page: number, plus: number, direct = false) => {
      const nextPage = direct ? plus : page + plus < 0 ? 2 : (page + plus) % 3
      setPage(nextPage)
    },
    [],
  )

  useEffect(() => {
    const timerId = setTimeout(() => handlePage(page, 1), 1500)
    return () => clearTimeout(timerId)
  }, [page, handlePage])

  return (
    <div
      className={`${
        onStart ? 'block' : 'hidden'
      } bg-[rgba(0,0,0,.3)] h-full w-full fixed left-0 top-0 z-[1002]`}
    >
      {disabled && (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-[1003] select-none cursor-wait"></div>
      )}
      <h2 className="screen-out">브런치 로그인</h2>
      <div
        className="bg-white rounded-[15px] inline-block h-[610px] w-[1000px] 
                  overflow-hidden absolute left-[50%] translate-x-[-500px] 
                  top-[50%] translate-y-[-305px]"
      >
        {/* item slide */}
        <div className="inline-block float-left w-[50%]">
          <div className="absolute top-[83px] left-[62px]">
            <Link href="/">
              <span
                className="w-[44px] h-[44px] inline-block 
                          bg-[0px_-820px] bg-ico-brunch-sub2"
              ></span>
              <span className="screen-out">브런치</span>
            </Link>
          </div>
          <div className="text-center pt-[142px] pb-[101px]">
            {/* 일러스트 영역 */}
            <div className="overflow-hidden relative whitespace-nowrap">
              <ul
                className={`relative ${
                  page === 0
                    ? 'left-0'
                    : page === 1
                    ? 'left-[-100%]'
                    : 'left-[-200%]'
                }`}
              >
                <li className="inline-block w-full relative">
                  <a href="#" className="block">
                    <div className="block h-[208px] w-[315px] m-auto">
                      <Image
                        src="https://i.ibb.co/9tFXKMb/pc-img-start-01.png"
                        alt="일러스트영역"
                        width={315}
                        height={208}
                      />
                    </div>
                    <div className="block mx-auto mt-[41px] mb-[17px]">
                      <strong className="block text-[27px] font-normal leading-none">
                        브랜치스토리 작가로 데뷔하세요.
                      </strong>
                      <span className="text-[#999] block text-[15px] mt-[14px]">
                        진솔한 에세이부터 업계 전문 지식까지,
                        <br />
                        당신의 이야기를 세상에 선보이세요.
                      </span>
                    </div>
                  </a>
                </li>
                <li className="inline-block w-full relative">
                  <a href="#" className="block">
                    <div className="block h-[208px] w-[315px] m-auto">
                      <Image
                        src="https://i.ibb.co/R7t07Sz/pc-img-start-02.png"
                        alt="일러스트영역"
                        width={315}
                        height={208}
                      />
                    </div>
                    <div className="block mx-auto mt-[41px] mb-[17px]">
                      <strong className="block text-[27px] font-normal leading-none">
                        브런치스토리로 제안받는 새로운 기회
                      </strong>
                      <span className="text-[#999] block text-[15px] mt-[14px]">
                        다양한 프로젝트와 파트너를 통해
                        <br />
                        작가님의 작품이 책·강연 등으로 확장됩니다.
                      </span>
                    </div>
                  </a>
                </li>
                <li className="inline-block w-full relative">
                  <a href="#" className="block">
                    <div className="block h-[208px] w-[315px] m-auto">
                      <Image
                        src="https://i.ibb.co/4Pt3MxS/pc-img-start-03.png"
                        alt="일러스트영역"
                        width={315}
                        height={208}
                      />
                    </div>
                    <div className="block mx-auto mt-[41px] mb-[17px]">
                      <strong className="block text-[27px] font-normal leading-none">
                        글로 만나는 작가의 경험
                      </strong>
                      <span className="text-[#999] block text-[15px] mt-[14px]">
                        작가를 구독하고, 새 글을 받아보세요.
                        <br />
                        당신에게 영감을 주는 작품을 추천합니다.
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* 버튼 영역 */}
            <div>
              <button
                onClick={() => handlePage(page, -1)}
                className="inline-block w-[18px] h-[18px]"
              >
                <span
                  className="inline-block h-[13px] w-[7px] align-middle 
                            overflow-hidden leading-none indent-[-999px]
                            bg-ico-brunch-sub2 bg-[-140px_-810px]"
                >
                  이전
                </span>
              </button>
              <ul className="inline-block mx-[20px]">
                <li className="inline-block">
                  <PageButton page={page} role={0} handler={setPage} />
                </li>
                <li className="inline-block">
                  <PageButton page={page} role={1} handler={setPage} />
                </li>
                <li className="inline-block">
                  <PageButton page={page} role={2} handler={setPage} />
                </li>
              </ul>
              <button
                onClick={() => handlePage(page, 1)}
                className="inline-block w-[18px] h-[18px]"
              >
                <span
                  className="inline-block h-[13px] w-[7px] align-middle 
                            overflow-hidden leading-none indent-[-999px]
                            bg-ico-brunch-sub2 bg-[-140px_-790px]"
                >
                  다음
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* item start */}
        <Suspense fallback={<></>}>
          <StartItem setOnStart={setOnStart} setDisabled={setDisabled} />
        </Suspense>
      </div>
    </div>
  )
}
