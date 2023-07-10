'use client'
import { book } from '@/types'
import { useEffect, useState } from 'react'
import { getEnglishDate } from '@/lib/utils'
import BookCover from '../slides/bookCover'
import Image from 'next/image'

function SlideCover({
  releasedDate,
  isOpen,
  id,
}: {
  releasedDate: string
  isOpen: boolean
  id: string
}) {
  return (
    <div
      id={id}
      className={`${
        isOpen && 'hidden'
      } book-release bg-book-slide-cover bg-cover`}
    >
      <span
        className="box-border block text-[0px] h-[74px] leading-none 
                overflow-hidden absolute text-center w-[74px] indent-[-9999px]
                right-[34px] top-[22px] bg-ico-brunch-sub2 bg-[0px_-420px]"
      >
        brunch book
      </span>
      <span className="left-[57px] absolute top-[23px] origin-[0_0] rotate-[90deg]">
        <span className="block text-[10px] font-bold leading-[14px] tracking-[.5px]">
          First Edition
        </span>
        <span className="block text-[10px] leading-[14px] tracking-[.5px]">
          Release date. {releasedDate}
        </span>
      </span>
    </div>
  )
}

function OverviewSlide({
  bookData,
  extraClass,
  step,
  style,
}: {
  bookData: book
  extraClass: string
  step: 'step1' | 'step2' | 'step3'
  style: object
}) {
  return (
    <div
      style={{ ...style }}
      className={`${extraClass} absolute top-0 h-full pt-[10px] pb-[29px]
              w-[330px] bg-book-shadow bg-[50%_50%] transition-transform 
              duration-[.8s] ease-out`}
    >
      <div
        className={`z-[50] bg-white ${step !== 'step3' && 'pt-[27px] px-[30px]'}
              box-border h-[450px] relative w-full ${
                step !== 'step1' && 'border-l border-[#eee]'
              }`}
      >
        {/* STEP 1 */}
        {step === 'step1' && (
          <>
            <div className="h-auto mb-[12px] w-[180px]">
              <strong
                className="break-word text-[#666] block text-[26px] 
                  font-normal leading-[35px]"
              >
                {bookData.data.attributes.Title}
              </strong>
            </div>
            <div className="pt-[-3px]">
              <dl className="inline-block align-top pr-[8px] text-[0px] leading-none">
                <dt className="inline-block align-top pt-[2px] pr-[3px]">
                  <span
                    className="float-left h-[13px] w-[13px] overflow-hidden indent-[-9999px] 
                      inline-block bg-ico-brunch-sub2 bg-[-100px_-370px] align-top"
                  >
                    전체글갯수
                  </span>
                </dt>
                <dd className="text-[#666] inline-block align-top text-[12px] leading-[17px]">
                  <em className="text-[13px] font-sf_light leading-[17px] font-normal not-italic">
                    {bookData.data.attributes.writings?.data.length}
                  </em>
                  화
                </dd>
              </dl>
              <dl className="inline-block align-top pr-[8px] text-[0px] leading-none">
                <dt className="inline-block align-top pt-[2px] pr-[3px]">
                  <span
                    className="float-left h-[13px] w-[13px] overflow-hidden indent-[-9999px] 
                      inline-block bg-ico-brunch-sub2 bg-[-160px_-250px] align-top"
                  >
                    전체시간
                  </span>
                </dt>
                <dd className="text-[#666] inline-block align-top text-[12px] leading-[17px]">
                  <em className="text-[13px] font-sf_light leading-[17px] font-normal not-italic">
                    25
                  </em>
                  분
                </dd>
              </dl>
            </div>
            <div className="absolute bottom-[30px] left-[25px] right-[25px]">
              <strong
                className="block font-normal p-[0px_0px_11px_5px] text-[#333] 
                  text-[13px] leading-[19px]"
              >
                이런분께 추천드려요!
              </strong>
              {bookData.data.attributes.Summary.map((sentence, index) => (
                <span
                  className="break-word pl-[17px] text-[13px] text-[#666] block 
                      leading-[20px] relative 
                      after:content-[''] after:bg-[#979797] after:absolute after:h-[1px]
                      after:w-[6px] after:top-[8px] after:left-[6px]"
                  key={index}
                >
                  {sentence}
                </span>
              ))}
            </div>
            <div className="absolute right-[26px] top-[26px] text-center">
              <button className="w-[46px] h-[46px] border border-[#ddd] rounded-full">
                <span
                  className="bg-ico-brunch-sub2 inline-block align-top 
                    indent-[-999px] overflow-hidden leading-none h-[18px] w-[20px] mt-[2px]
                    bg-[-60px_-360px]"
                >
                  라이킷
                </span>
              </button>
              <span className="screen-out">라이킷 수</span>
              <span
                className="text-center text-[#666] block text-[14px] font-sf_light 
                    pt-[4px]"
              >
                6
              </span>
            </div>
          </>
        )}
        {/* STEP 2 */}
        {step === 'step2' && (
          <>
            <strong
              className="mt-[-2px] ml-[-1px] text-[13px] leading-[19px] pb-[17px] 
                    text-[#333] font-normal block"
            >
              브랜치북 소개
            </strong>
            <p className="break-word pt-[20px] text-[#666] text-[13px] leading-[23px]">
              {bookData.data.attributes.Introduction}
            </p>
            <div className="text-[0px] after:content-[''] after:block after:clear-both">
              {bookData.data.attributes.Tags.map((tag, index) => (
                <span
                  key={index}
                  className="relative block float-left p-[1px] mt-[8px] mr-[8px]"
                >
                  <input
                    type="checkbox"
                    disabled
                    id={`bookkeyword${index}`}
                    className="cursor-default appearance-none bg-transparent 
                            absolute left-0 top-0 right-0 bottom-0 w-full opacity-10"
                  />
                  <label
                    htmlFor={`bookkeyword${index}`}
                    className="bg-white border border-[#ddd] rounded-[40px] text-[#959595] 
                              inline-block text-[12px] h-[26px] leading-[26px] px-[10px] align-top"
                  >
                    {tag}
                  </label>
                </span>
              ))}
            </div>
          </>
        )}
        {/* STEP 3 */}
        {step === 'step3' && (
          <>
            <div className="relative w-full h-[97px]">
              <Image
                src={
                  bookData.data.attributes.Cover?.data.attributes.url as string
                }
                alt="book cover"
                fill={true}
                className=" object-cover"
              />
              <div className="absolute top-0 w-full h-[97px] bg-[rgba(0,0,0,0.1)]"></div>
            </div>
            <div className="relative">
              <span
                className="absolute rounded-full h-[80px] overflow-hidden 
                          right-[26px] w-[80px] top-[-40px]"
              >
                <Image
                  src={
                    bookData.data.attributes.author?.data.attributes.Profile
                      ?.data.attributes.url as string
                  }
                  alt="profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </span>
              <div className="p-[33px_30px_0px]">
                <strong
                  className="vertical-three-box break-words text-ellipsis overflow-hidden 
                            leading-[24px] font-normal text-[18px] text-[#333] pr-[110px]"
                >
                  {bookData.data.attributes.author?.data.attributes.Name}
                </strong>
                <span className="block pt-[5px]">
                  <span>
                    <em className="screen-out">직업</em>
                    <span className="text-[#666] text-[13px] leading-[19px]">
                      {bookData.data.attributes.author?.data.attributes.Job}
                    </span>
                  </span>
                </span>
              </div>
              <div className="p-[22px_33px_0px]">
                <p className="break-word pt-[1px] text-[#666] text-[13px] leading-[22px]">
                  {
                    bookData.data.attributes.author?.data.attributes
                      .Introduction
                  }
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const threeStep = [
  ['step1', 'z-[5] pl-[20px]'],
  ['step2', 'z-[4]'],
  ['step3', 'z-[3]'],
]
// translate-x-[320px]
// translate-x-[670px]
// translate-x-[1000px]
// [1330px]
export default function Overview({ bookData }: { bookData: book }) {
  const [isOpen, setIsOpen] = useState(false)
  const releasedDate = getEnglishDate(bookData.data.attributes.publishedAt)

  useEffect(() => {
    const coverTimerId = setTimeout(() => {
      const slideCover = document.getElementById('slide-cover')
      if (slideCover) {
        slideCover.style.display = 'none'
      }
    }, 1000)
    const slideTimerId = setTimeout(() => {
      setIsOpen(true)
    }, 1300)
    return () => {
      clearTimeout(slideTimerId)
      clearTimeout(coverTimerId)
    }
  }, [])

  return (
    <div className="h-[600px] box-border pt-[100px] overflow-hidden bg-wrap-overview-bg">
      <h3 className="screen-out">브런치북 정보</h3>
      <div className="w-[1000px] h-[450px] m-auto relative">
        {/* slide wrap */}
        <div className="w-[2000px] h-full absolute transition-all duration-300 top-0 left-0">
          <SlideCover
            releasedDate={releasedDate}
            isOpen={isOpen}
            id="slide-cover"
          />
          <BookCover bookData={bookData} isBookPage={true} />
          <div
            className={`${
              !isOpen && 'opacity-0'
            } absolute top-[-10px] h-full after:content-[''] after:block after:clear-both`}
          >
            {/* introduction */}
            {threeStep.map(([step, extraClass], index) => {
              const shift = index === 0 ? 0 : 20
              return (
                <OverviewSlide
                  key={index}
                  bookData={bookData}
                  step={step as 'step1' | 'step2' | 'step3'}
                  extraClass={extraClass}
                  style={{
                    transform: isOpen
                      ? `translateX(${320 + index * 330 + shift}px)`
                      : 'translateX(0px)',
                  }}
                />
              )
            })}
            <span
              className={`z-[2] absolute leading-[16px] right-[-92px] 
                        tracking-[-.3px] text-[12px] text-[#959595] font-sf_light 
                        transition-transform duration-[.8s] ease-out w-[166px] h-[26px] 
                        bottom-[62px] text-right rotate-[90deg] ${
                          isOpen ? 'translate-x-[1330px]' : 'translate-x-0'
                        }`}
            >
              {`Release date. ${releasedDate}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
