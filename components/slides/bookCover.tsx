import Image from 'next/image'
import { book } from '@/types'

export default function BookCover({
  bookData,
  isBookPage = false,
}: {
  bookData: book
  isBookPage?: boolean
}) {
  const { Title: title, Cover: cover } = bookData.data.attributes
  const imgUrl = cover?.data.attributes.url
  const author = bookData.data.attributes.author?.data
  return (
    <div
      className={`absolute shadow-[0_10px_20px_0_rgba(0,0,0,.1)] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0
      before:bg-[#fff] before:w-[2px] before:h-full before:opacity-30
      before:inline-block before:blur-[0.7px]
      after:content-[''] after:absolute after:bottom-0 after:right-0
      after:w-[2px] after:inline-block after:h-[99%] after:bg-[#000]
      after:blur-[1px] after:opacity-[.12] ${
        isBookPage
          ? `book-cover-motion left-0 top-0 h-full w-[320px] box-border pt-[95px] z-[60]`
          : `top-[50%] left-1/2 transform translate-x-[-50%] translate-y-[-50%] z-[5]`
      } `}
    >
      {isBookPage ? (
        <Image
          src={imgUrl as string}
          fill={true}
          className="object-cover object-cneter rounded-[2px_7px_7px_2px] box-border block "
          alt="Book Cover"
        />
      ) : (
        <Image
          src={imgUrl as string}
          width={230}
          height={324}
          className="object-cover object-cneter rounded-[2px_7px_7px_2px] box-border block "
          alt="Book Cover"
        />
      )}

      <div
        className={`z-[1] bg-[#fff] ${
          isBookPage
            ? `relative top-0 mx-[70px] h-[240px] w-auto`
            : `absolute top-[68px] h-[172px] w-[130px] 
             mx-[50px] font-serif_mj`
        }`}
      >
        <strong
          className={`book-cover block overflow-hidden text-ellipsis break-keep font-normal ${
            isBookPage
              ? 'font-noto_sans_thin text-[26px] leading-[34px] max-h-[170px] pt-[11px] px-[16px]'
              : `max-h-[92px] leading-[24px] text-[18px] p-[10px_13px_0px_10px]`
          }`}
        >
          {title}
        </strong>
        <span
          className={`block overflow-hidden absolute box-border w-full left-0 
          break-all text-ellipsis txt-writer ${
            isBookPage
              ? `font-noto_sans_demlight bottom-[16px] text-[14px] 
              leading-[20px] max-h-[37px] text-[#959595] px-[16px]`
              : `bottom-[9px] text-[#666] px-[10px] max-h-[35px]
              text-[11px] leading-[16px] `
          }`}
        >
          {author?.attributes.Name}
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
        className={`tracking-[.2px] font-sf_bold block absolute left-0 
        w-full z-[1] text-center text-[#fff] ${
          isBookPage
            ? `text-[15px] bottom-[22px] leading-[18px]`
            : `bottom-[13px] text-[11px] leading-[18px]`
        } `}
      >
        brunch book
      </span>
      <span
        className="absolute top-0 left-0 h-full block w-full
                rounded-[2px_6px_6px_0px] bg-[rgba(0,0,0,.1)]"
      ></span>
    </div>
  )
}
