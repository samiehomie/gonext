'use client'
import Image from 'next/image'
import { useEffect, ReactNode } from 'react'
import type { userSession } from '@/types'
import Link from 'next/link'
import defaultProfile from '@/public/default.jpg'
import LogOut from '../buttons/logOut'
import useUser from '@/lib/useUser'
import { usePathname } from 'next/navigation'

function InnerContainer({
  children,
  onSide
}: {
  children: ReactNode
  onSide: boolean
}) {
  return (
    <div
      id="side-menu"
      className={`bg-white border-r border-[#ddd] h-full w-[260px] 
                fixed text-center top-0 z-[1000] transition-all 
                duration-300 ease-in ${onSide ? 'ml-o' : 'ml-[-261px]'}`}
    >
      <main>{children}</main>
    </div>
  )
}

function CommonContent({ path }: { path: string | null }) {
  return (
    <>
      <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px]">
        <Link
          href="/"
          className={`hover:text-[#00c6be] block h-[13px] leading-[14px] text-[14px] relative ${
            path === '/' && 'text-[#00c6be] pointer-events-none'
          }`}
        >
          브런치스토리 홈
        </Link>
      </li>
    </>
  )
}

function UserProfile({ user }: { user: userSession }) {
  const { username, id, avatar } = user
  return (
    <div className="bg-[#f6f6f6] h-[239px] overflow-hidden realtive font-noto_sans_light">
      <Link href={`/user/${id}`}>
        <div className="w-[60px] m-[40px_auto_0px]">
          <Image
            src={avatar}
            alt={username as string}
            height={60}
            width={60}
            className="bg-white rounded-[60px] block "
          />
        </div>
        <div className="ml-[-2px] pt-[12px]">
          <strong
            className="inline-block text-[#333] text-[15px] text-ellipsis 
                    whitespace-nowrap w-[212px] overflow-hidden align-bottom"
          >
            {username}
          </strong>
          <p
            className="text-[#959595] inline-block font-[Georgia] text-[12px] italic mt-[6.5px] 
                      overflow-hidden text-ellipsis align-top whitespace-nowrap w-[212px]"
          >
            {`${process.env.NEXT_PUBLIC_DOMAIN}/${id}`}
          </p>
        </div>
      </Link>
      {/* buttons */}
      <Link href={'/write'} prefetch={false}>
        <button
          className="bg-white border border-[#00c6be] rounded-[16px] text-[#00c6be] 
                      text-[13px] h-[32px] mt-[18px] w-[80px]"
        >
          글쓰기
        </button>
      </Link>
    </div>
  )
}

function UserOnlyButton() {
  return (
    <>
      <a href={'/me/setting'}>
        <button
          className="border border-[#bbb] rounded-[16px] text-[#959595] text-[13px] 
                    h-[32px] mx-[2px] w-[80px]"
        >
          설정
        </button>
      </a>
      <LogOut>
        <button
          className="border border-[#bbb] rounded-[16px] text-[#959595] text-[13px] 
                    h-[32px] mx-[2px] w-[80px] inline-block"
        >
          로그아웃
        </button>
      </LogOut>
    </>
  )
}

function UserOnlyMenu({
  user,
  path
}: {
  user: userSession
  path: string | null
}) {
  return (
    <>
      <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px] ">
        <Link
          href={`/user/${user.id}`}
          className={`hover:text-[#00c6be] block h-[13px] leading-[14px] 
                  text-[14px] group relative ${
                    path === `/user/${user.id}` &&
                    'text-[#00c6be] pointer-events-none'
                  }`}
        >
          내 브랜치스토리
        </Link>
      </li>
      <li className="h-[13px] leading-[13px] py-[12.5px] m-auto w-[240px] ">
        <Link
          href="/ready"
          className={`hover:text-[#00c6be] block h-[13px] leading-[14px] 
                  text-[14px] group relative ${
                    path === '/ready' && 'text-[#00c6be] pointer-events-none'
                  }`}
        >
          작가의 서랍
        </Link>
      </li>
      {/* <li
        className="block bg-ico-ico-sidebar bg-[-52px_-5px] h-[15px] w-[140px] 
                  m-[30px_auto_32px] leading-[13px]"
      ></li> */}
    </>
  )
}

export default function SideMenu({
  onSide,
  setOnStart,
  setOnSide
}: {
  onSide: boolean
  setOnStart: (arg: boolean) => void
  setOnSide: (arg: boolean) => void
}) {
  const { user } = useUser()
  const pathname = usePathname()

  useEffect(() => {
    document.addEventListener('click', function handler(e) {
      if (
        e.target instanceof HTMLElement &&
        !e.target.matches('#side-menu, #side-menu *') &&
        onSide
      ) {
        setOnSide(false)
        document.removeEventListener('click', handler)
      }
    })
  }, [onSide, setOnSide])

  if (!user) return null
 
  return (
    <InnerContainer onSide={onSide}>
      {user?.isLoggedIn ? (
        <UserProfile user={user} />
      ) : (
        <div
          className="bg-[#f8f8f8] h-[239px] overflow-hidden 
                      relative text-center font-noto_sans_demlight"
        >
          <div
            className="bg-ico-brunch-titles bg-[-1px_-106px] h-[48px] w-[48px] 
                      mx-auto mt-[40px] mb-[12px]"
          ></div>
          <p
            className="text-[#666] text-[13px] italic leading-[16px] 
                        text-center font-[Georgia]"
          >
            The Story of <br /> Future Writers
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setOnStart(true)
            }}
          >
            <button
              className="mt-[22px] w-[151px] align-baseline bg-white border 
                      border-[#00c6be] rounded-[16px] text-[#00c6be] text-[13px] h-[32px]"
            >
              브런치스토리 시작하기
            </button>
          </a>
        </div>
      )}
      <div className="border-t border-[#ddd] overflow-y-auto pt-[28px] h-[427px]">
        <ul>
          <CommonContent path={pathname} />
          {user?.isLoggedIn && <UserOnlyMenu user={user} path={pathname} />}
        </ul>

        <div className="absolute mb-[37px] mt-[40px] bottom-0 w-full text-center">
          <div className="pb-[40px]">
            <a href="#" className="block">
              <Image
                src={'https://i.ibb.co/sg0m59P/image.png'}
                alt="프로젝트 리스트 바로가기"
                width={168}
                height={72}
                className="m-auto"
              />
            </a>
          </div>
          {user?.isLoggedIn ? (
            <UserOnlyButton />
          ) : (
            <a
              href="#"
              className="text-[13px] text-[#959595] border-b border-[#bbb]"
            >
              계정을 잊어버리셨나요?
            </a>
          )}
        </div>
      </div>
    </InnerContainer>
  )
}
