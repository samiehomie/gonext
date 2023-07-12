'use client'
import Image from 'next/image'
import { writing, slideStyles } from '@/types'
import { removeMarkdownImages } from '../../lib/utils'
import Link from 'next/link'

export default function Writing({
  writing,
  boxType,
}: {
  writing: writing['data']
  boxType: slideStyles
}) {
  return (
    <Link
      key={writing.id}
      href={`/${writing.attributes.user?.data.id}/${writing.id}`}
      className={`${
        boxType === 'hor'
          ? 'w-1/2 h-[260px]'
          : boxType === 'big'
          ? 'w-1/2 h-[520px]'
          : boxType === 'long'
          ? 'w-full h-[320px]'
          : boxType === 'short'
          ? 'w-[320px] h-[200px]'
          : 'w-[320px] h-[520px]'
      } group block relative float-left overflow-hidden`}
    >
      <Image
        src={writing.attributes.cover?.data.attributes.formats.small.url as string}
        fill={true}
        className="object-cover object-cneter 
                        transition-transform duration-300
                        group-hover:scale-110"
        alt={writing.attributes.title}
      />
      <div
        className="table h-full w-full z-[2]
                        absolute left-1/2 ml-[-50%] top-0 
                        text-center text-[#fff]"
      >
        <div className="inline-block align-middle max-w-[222.6px] break-keep">
          <strong className="title-pic">{writing.attributes.title}</strong>
          {/* summary */}
          <span
            className={`${
              boxType === 'hor' ? 'hidden' : 'block'
            } font-noto_sans_demlight 
                            leading-[20px] pt-[9px]`}
          >
            {removeMarkdownImages(writing.attributes.content).slice(0, 20)}
            <br />
            {removeMarkdownImages(writing.attributes.content).slice(20, 34) +
              '...'}
          </span>
          <span
            className="w-[200px] block m-auto pt-[30px] overflow-hidden 
                            whitespace-nowrap text-ellipsis text-[12px] opacity-80"
          >
            <span
              className="bg-ico-brunch-main inline-block
                              w-[14px] h-[13px] mt-[3px] bg-[-38px_-130px] 
                              overflow-hidden indent-[-9999px] align-top leading-none"
            >
              by
            </span>
            {` ${writing.attributes.user?.data.username}`}
          </span>
        </div>
        <div className="h-full overflow-hidden inline-block align-middle"></div>
      </div>
      <div
        className="absolute left-0 top-0 w-full h-full 
                        bg-[#333] opacity-40 transition-opacity duration-300 ease-in-out 
                        group-hover:opacity-50"
      ></div>
    </Link>
  )
}
