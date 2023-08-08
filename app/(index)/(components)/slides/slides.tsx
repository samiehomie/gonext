'use client'
import type { writings, slideStyles, book } from '../../../../types'
import Image from 'next/image'
import { ReactElement } from 'react'
import Book from '../../../(content)/book/(components)/slides/book'
import Writing from './writing'
import Link from 'next/link'

// TODO: Check out whether lazy loading is working
const slideStyles: Array<slideStyles>[] = [
  ['ver', 'ver', 'ver'],
  ['hor', 'hor', 'hor', 'hor'],
  ['big', 'hor', 'hor'],
  ['ver', 'ver', 'ver'],
  ['long', 'short', 'short', 'short'],
  ['big', 'hor', 'hor'],
  ['ver', 'ver', 'ver'],
  ['long', 'short', 'short', 'short']
]

export default function Slides({ writings, book }: { writings: writings; book: book }) {
  if (!writings) return null

  const writingsWithBook = writings.data.slice(0, 2)
  const restWritings = writings.data.slice(2)

  let styleIndex = 0
  let slideKey = 0
  let slideElements: ReactElement[] = []
  while (restWritings.length > 0) {
    styleIndex = styleIndex % slideStyles.length
    slideElements.push(
      <li className="float-left" key={`slide-${slideKey}`}>
        <div className="overflow-hidden w-[960px]">
          {slideStyles[styleIndex].map((style) => {
            const currentWriting = restWritings.pop()
            if (typeof currentWriting !== 'undefined') {
              return (
                <Writing
                  key={`w-${currentWriting.id}`}
                  writing={currentWriting}
                  boxType={style}
                />
              )
            }
            return null
          })}
        </div>
      </li>
    )
    slideKey += 1
    styleIndex += 1
  }

  return (
    <>
      <li className="float-left">
        <div className="overflow-hidden w-[960px]">
          {/* brunch book */}
          <Book book={book} />
          {/* 2 stack writings alongside book*/}
          {writingsWithBook.map((writing) => (
            <Link
              key={writing.id}
              href={`/writing/${writing.attributes.user?.data.id}/${writing.id}#title`}
              className="group block w-1/2 h-[260px]
                        relative float-left overflow-hidden"
            >
              {writing.attributes.cover?.data && (
                <Image
                  src={
                    writing.attributes.cover?.data.attributes.formats.small
                      .url as string
                  }
                  fill={true}
                  className="object-cover object-cneter 
                          transition-transform duration-300
                          group-hover:scale-110"
                  alt={writing.attributes.title}
                />
              )}

              <div
                className="block h-full w-full text-[#fff] text-center
                          absolute left-1/2 ml-[-50%] top-0 z-[2]"
              >
                <div className="inline-block align-middle max-w-[222.6px] break-keep">
                  <strong className="title-pic">
                    {writing.attributes.title}
                  </strong>
                  <span
                    className="w-[200px] block m-auto overflow-hidden pt-[30px]
                              whitespace-nowrap text-ellipsis text-[12px] opacity-80"
                  >
                    <span
                      className="bg-ico-brunch-main inline-block
                                w-[14px] h-[13px] mt-[3px] bg-[-38px_-130px] 
                                overflow-hidden indent-[-9999px] align-top leading-none"
                    >
                      by
                    </span>
                    {` ${
                      writing.attributes.user?.data.attributes
                        .username as string
                    }`}
                  </span>
                </div>
                <div className="h-full overflow-hidden inline-block align-middle"></div>
              </div>
              <div
                className="absolute left-0 top-0 w-full h-full bg-[#333]
                          opacity-40 transition-opacity duration-300 ease-in-out 
                          group-hover:opacity-50"
              ></div>
            </Link>
          ))}
        </div>
      </li>
      {slideElements}
    </>
  )
}
