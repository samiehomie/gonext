'use client'
import moment from 'moment'
import { book } from '@/types'
import { queryBook } from '@/lib/queries'
import useSWR from 'swr'
import BookCover from './bookCover'
import Link from 'next/link'

export default function Book({ bookId }: { bookId: number }) {
  const { data: bookData }: { data: book | undefined } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/books/${bookId}?` + queryBook
  )

  if (!bookData) return null

  const { publishedAt } = bookData.data.attributes
  const date = moment(publishedAt).format('MMM.DD.YYYY')

  return (
    <Link
      href={`/book/${bookId}`}
      className="group float-left relative w-1/2 h-[520px] block bg-book-cover
                before:content-[''] before:block before:absolute 
                before:bottom-0 before:w-full before:h-[156px] before:bg-[#f6f6f6]
                after:content-[''] after:block after:absolute 
                after:bottom-[88px] after:w-[357px] after:h-[53px] after:left-[119px]
                after:bg-book-shadow after:z-[2] after:bg-no-repeat"
    >
      <span
        className="bg-[transparent] block absolute bottom-0 left-0 right-0 top-0 
                  transition-all duration-300 ease-in-out z-[0] group-hover:bg-[rgba(0,0,0,.1)]
                  before:content-[''] before:block before:h-full before:w-full
                  before:absolute before:top-0 before:left-0
                  before:bg-book-blur before:opacity-0 before:z-[1] 
                  before:transition-all before:duration-300 before:ease-in-out
                  before:group-hover:opacity-60"
      ></span>
      <BookCover bookData={bookData} />
      <span
        className="absolute table z-[2] w-full bottom-0 h-[109px] 
                  text-[12px] font-noto_sans_demlight"
      >
        <span className="table-cell align-middle text-center">
          <span className="block text-center">First Edition</span>
          <span className="block text-center tracking-[-.1px] text-[#959595]">
            {`Released date${date}`}
          </span>
        </span>
      </span>
    </Link>
  )
}
