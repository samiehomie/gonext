'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { user } from '@/types'
import Link from 'next/link'
import { confirmSubscription } from '@/lib/utils'
import useUser from '@/lib/useUser'
import useFollowing from '@/lib/useFollowing'
import useFollower from '@/lib/useFollower'
import SubscribeButton from '@/components/buttons/subscribeButton'

// function MoreControl() {
//   return (
//     <div
//       id="more-control"
//       className="z-[100010] w-[218px] top-[42px] right-[12px] absolute h-auto"
//     >
//       <div className="border border-[#ddd] bg-white">
//         <button className="block w-full h-[42px] text-[13px] text-[#959595] hover:bg-[#f8f8f8] hover:text-[#333]">
//           차단하기
//         </button>
//         <button
//           className="border-t border-[#ddd] block w-full h-[42px] text-[13px] text-[#959595]
//                   hover:bg-[#f8f8f8] hover:text-[#333]"
//         >
//           신고하기
//         </button>
//       </div>
//     </div>
//   )
// }

const initialState = { author: false, writings: false, books: false }

function getContent() {
  return Object.keys(initialState).map((key) => document.getElementById(key))
}

export default function Profile({ userData }: { userData: user }) {
  const [zoom, setZoom] = useState(false)
  const [tabs, setTabs] = useState({ ...initialState, author: true })
  const { user } = useUser()
  const { followers } = useFollower({ userId: userData.id })
  const { followings } = useFollowing({
    subscriptionId: user?.subscription
  })

  // const [more, setMore] = useState(false)
  // useEffect(() => {
  //   document.addEventListener('click', function handler(e) {
  //     if (
  //       e.target instanceof HTMLElement &&
  //       !e.target.matches('#more-control, #more-control *') &&
  //       more
  //     ) {
  //       setMore(false)
  //       document.removeEventListener('click', handler)
  //     }
  //   })
  // }, [more])

  useEffect(() => {
    const [authorElem, writingsElem, booksElem] = getContent()
    if (authorElem && writingsElem && booksElem) {
      authorElem.style.display = tabs.author ? 'block' : 'none'
      writingsElem.style.display = tabs.writings ? 'block' : 'none'
      booksElem.style.display = tabs.books ? 'block' : 'none'
    }
  }, [tabs])

  if (!user || !followers) return null
  if (!followings && user?.isLoggedIn) return null

  const subscribed = followings
    ? confirmSubscription(followings, userData.id)
    : false

  return (
    <header className="bg-white font-noto_sans_demlight text-[#333]">
      <h2 className="screen-out">{userData.username}</h2>
      <div className=" bg-[#f8f8f8] h-[120px] relative"></div>
      <div
        className="w-[700px] relative pt-[35px] mx-auto mb-[97px] after:block
                  after:content-[''] after:clear-both"
      >
        <div
          onClick={() => {
            setZoom(false)
            document.body.style.overflow = 'visible'
          }}
          className={`fixed z-[10010] w-full h-full overflow-hidden top-0 left-0 
              bg-white cursor-zoom-out ${!zoom && 'hidden'}`}
        >
          <div className="relative zoom-motion h-full">
            <Image
              priority
              src={userData.profile?.url!}
              alt={userData.username}
              width={500}
              height={500}
              className="z-[-1] absolute top-[50%] left-1/2 translate-x-[-250px] 
                        translate-y-[-250px] block cursor-zoom-out"
            />
          </div>
        </div>
        <div className="w-[100px] absolute h-[100px] overflow-hidden right-0 top-[-50px]">
          <Image
            src={userData.profile?.formats.thumbnail.url!}
            alt={userData.username}
            width={100}
            height={100}
            className="rounded-full cursor-zoom-in"
            onClick={() => {
              setZoom(true)
              document.body.style.overflow = 'hidden'
            }}
          />
        </div>
        <div>
          <strong className="block text-[28px] font-normal leading-[34px] pr-[170px]">
            {userData.username}
          </strong>
          <span className="text-[#959595] block text-[13px] leading-[20px] pt-[5px]">
            <em className="screen-out">직업</em>
            <span className="text-[#959595] text-[13px] leading-[20px]">
              {userData.job}
            </span>
          </span>
          <dl className="text-[#959595] text-[12px] overflow-hidden pt-[22px] pr-[200px]">
            <dt className="screen-out">브런치 정보</dt>
            <dd className="float-left mr-[40px]">
              <Link href={`/user/${userData.id}/follower`}>
                <em className="block not-italic font-normal">구독자</em>
                <span className="block font-noto_sans_light font-medium text-[20px] mt-[-2px]">
                  {followers.data.length}
                </span>
              </Link>
            </dd>
            <dd className="float-left">
              <Link href={`/user/${userData.id}/following`}>
                <em className="block not-italic font-normal">관심작가</em>
                <span className="block font-noto_sans_light font-medium text-[20px] mt-[-2px]">
                  {userData.subscription?.targets.length || 0}
                </span>
              </Link>
            </dd>
          </dl>
        </div>
        <div
          className="absolute right-0 bottom-[12px] h-[42px] pr-[5px] 
                    after:content-[''] after:clear-both after:block"
        >
          <span>
            <SubscribeButton
              subscribed={subscribed}
              userMe={user}
              targetUserId={userData.id}
              isBig={true}
            />
          </span>
          {/* <div className="absolute top-[6px] right-[-12px] after:content-[''] after:clear-both after:block">
            <button
              onClick={() => setMore(true)}
              className="block text-[0px] h-[32px] overflow-hidden w-[27px] indent-[-9999px]"
            >
              <span
                className="bg-[-180px_-190px] block bg-ico-brunch-sub2 h-[17px] w-[4px] relative 
                          overflow-hidden leading-none indent-[-9999px] mb-[1px] ml-[12px] align-top"
              >
                메뉴 더보기
              </span>
            </button>
            {more && <MoreControl />}
          </div> */}
        </div>
      </div>
      {/* tabs */}
      <div className="m-auto w-[700px] relative">
        <strong className="screen-out">작가프로필 하위메뉴</strong>
        <ul className="border-t border-[#eee] h-[58px]">
          {Object.keys(initialState).map((tabName, index) => (
            <li className="float-left w-1/3" key={index}>
              <button
                onClick={() => setTabs({ ...initialState, [tabName]: true })}
                className={`block text-[16px] h-[24px] mt-[-1px] text-center w-full 
                        pt-[16px] pb-[17px] border-t ${
                          tabs[tabName as keyof typeof initialState]
                            ? 'border-[#333] text-[#333]'
                            : 'border-transparent text-[#959595]'
                        }`}
              >
                <span className="inline-block px-[7px] relative text-[15px] text-center">
                  {tabName === 'author' && '작가설명'}
                  {tabName === 'writings' && `글 ${userData.writings?.length}`}
                  {tabName === 'books' && `작품 ${userData.books?.length}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
