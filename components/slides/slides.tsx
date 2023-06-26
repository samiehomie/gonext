import qs from 'qs'
import moment from 'moment'
import type { singleBookHasCover, writings, writing } from '../../types'
import { getData } from '../../lib/fetchData'
import Image from 'next/image'

function removeMarkdownImages(str: string) {
  const regex = /!\[(.*?)\]\((.*?)\)/g
  return str.replace(regex, '')
}

function Book({ bookData }: { bookData: singleBookHasCover }) {
  const {
    Title: title,
    publishedAt,
    author,
    Cover: cover,
  } = bookData.data.attributes
  const imgUrl = cover.data.attributes.formats.small.url
  const date = moment(publishedAt).format('MMM.DD.YYYY')

  return (
    <a
      href="#"
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
      <div
        className="absolute top-[50%] left-1/2 overflow-hidden
                  transform translate-x-[-50%] translate-y-[-50%] z-[5] 
                  shadow-[0_10px_20px_0_rgba(0,0,0,.1)] 
                  before:content-[''] before:absolute before:top-0 before:left-0
                  before:bg-[#fff] before:w-[2px] before:h-full before:opacity-30
                  before:inline-block before:blur-[0.7px]
                  after:content-[''] after:absolute after:bottom-0 after:right-0
                  after:w-[2px] after:inline-block after:h-[99%] after:bg-[#000]
                  after:blur-[1px] after:opacity-[.12]"
      >
        <Image
          src={imgUrl}
          width={230}
          height={324}
          className="object-cover object-cneter rounded-[2px_7px_7px_2px] box-border block "
          alt="Book Cover"
        />
        <div
          className="absolute top-[68px] h-[172px] w-[130px] z-[1] 
                    bg-[#fff] mx-[50px] font-serif_mj"
        >
          <strong
            className="block overflow-hidden text-ellipsis max-h-[92px]
                      break-keep leading-[24px] text-[18px] p-[10px_13px_0px_10px] 
                      font-normal book-cover"
          >
            {title}
          </strong>
          <span
            className="block absolute bottom-[9px] box-border text-[#666]
                       w-full left-0 px-[10px] overflow-hidden max-h-[35px]
                       text-[11px] leading-[16px] break-all text-ellipsis txt-writer"
          >
            {author.data.attributes.Name}
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
          className="block absolute bottom-[13px] left-0 w-full z-[1]
                    text-[11px] leading-[18px] text-center text-[#fff] 
                    tracking-[.2px] font-sf_bold"
        >
          brunch book
        </span>
        <span
          className="absolute top-0 left-0 h-full block w-full
                    rounded-[2px_6px_6px_0px] bg-[rgba(0,0,0,.1)]"
        ></span>
      </div>
      <span
        className="absolute table z-[2] w-full bottom-0 h-[109px] 
                  text-[12px] font-noto_sans_light"
      >
        <span className="table-cell align-middle text-center">
          <span className="block text-center">First Edition</span>
          <span className="block text-center tracking-[-.1px] text-[#959595]">
            {`Released date${date}`}
          </span>
        </span>
      </span>
    </a>
  )
}

function Writing({
  writings,
  boxType,
}: {
  writings: [writing]
  boxType: '2stack' | '3sideBySide'
}) {
  return (
    <li className="float-left">
      <div className="overflow-hidden w-[960px]">
        {writings.map((writing) => (
          <a
            key={writing.id}
            href="#"
            className={`${
              boxType === '2stack' ? 'w-1/2 h-[260px]' : 'w-[320px] h-[520px]'
            } group block relative float-left overflow-hidden`}
          >
            <Image
              src={writing.attributes.Cover.data.attributes.formats.small.url}
              fill={true}
              className="object-cover object-cneter 
                        transition-transform duration-300
                        group-hover:scale-110"
              alt={writing.attributes.Title}
            />
            <div
              className="table h-full w-full z-[2]
                        absolute left-1/2 ml-[-50%] top-0 
                        text-center text-[#fff]"
            >
              <div className="inline-block align-middle max-w-[222.6px] break-keep">
                <strong className="title-pic">
                  {writing.attributes.Title}
                </strong>
                {/* summary */}
                <span
                  className={`${
                    boxType === '2stack' ? 'hidden' : 'block'
                  } font-noto_sans_light 
                            leading-[20px] pt-[9px]`}
                >
                  {removeMarkdownImages(writing.attributes.Content).slice(
                    0,
                    20,
                  )}
                  <br />
                  {removeMarkdownImages(writing.attributes.Content).slice(
                    20,
                    34,
                  ) + '...'}
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
                  {` ${writing.attributes.author.data.attributes.Name}`}
                </span>
              </div>
              <div className="h-full overflow-hidden inline-block align-middle"></div>
            </div>
            <div
              className="absolute left-0 top-0 w-full h-full 
                        bg-[#333] opacity-40 transition-opacity duration-300 ease-in-out 
                        group-hover:opacity-50"
            ></div>
          </a>
        ))}
      </div>
    </li>
  )
}

export default async function Slides() {
  const urlBook = `${process.env.NEXT_PUBLIC_DB_URL}/api/books/1?`
  const urlWritings = `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?`

  const queryBook = qs.stringify(
    {
      fields: ['Title', 'publishedAt'],
      populate: {
        author: {
          fields: ['name'],
        },
        Cover: {
          fields: ['formats'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  const queryWritings = qs.stringify(
    {
      fields: ['Title', 'Subtitle', 'Content'],
      populate: {
        author: {
          fields: ['Name'],
        },
        Cover: {
          fields: ['formats'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  const bookData: singleBookHasCover = await getData(urlBook + queryBook)
  const { data: writingsArray }: writings = await getData(
    urlWritings + queryWritings,
  )

  const twoWritings = writingsArray.slice(0, 2)
  const threeWritings = writingsArray.slice(2, 5)
  return (
    <>
      <li className="float-left">
        <div className="overflow-hidden w-[960px]">
          {/* brunch book */}
          <Book bookData={bookData} />
          {/* 2 stack writings alongside book*/}
          {twoWritings.map((writing) => (
            <a
              key={writing.id}
              href="#"
              className="relative float-left w-1/2 h-[260px]
                             block overflow-hidden group"
            >
              <Image
                src={writing.attributes.Cover.data.attributes.formats.small.url}
                fill={true}
                className="object-cover object-cneter transition-transform duration-300
                              group-hover:scale-110"
                alt={writing.attributes.Title}
              />
              <div
                className="table h-full w-full text-[#fff] absolute
                              left-1/2 ml-[-50%] top-0 text-center z-[2]"
              >
                <div className="inline-block align-middle max-w-[222.6px] break-keep">
                  <strong className="title-pic">
                    {writing.attributes.Title}
                  </strong>
                  <span
                    className="w-[200px] block m-auto overflow-hidden 
                                whitespace-nowrap text-ellipsis text-[12px] opacity-80 pt-[30px]"
                  >
                    <span
                      className="bg-ico-brunch-main inline-block
                      w-[14px] h-[13px] mt-[3px] bg-[-38px_-130px] 
                      overflow-hidden indent-[-9999px] align-top leading-none"
                    >
                      by
                    </span>
                    {` ${writing.attributes.author.data.attributes.Name}`}
                  </span>
                </div>
                <div className="h-full overflow-hidden inline-block align-middle"></div>
              </div>
              <div
                className="absolute left-0 top-0 w-full h-full 
                              bg-[#333] opacity-40 transition-opacity duration-300 ease-in-out 
                              group-hover:opacity-50"
              ></div>
            </a>
          ))}
        </div>
      </li>
      <li className="float-left">
        <div className="overflow-hidden w-[960px]">
          {threeWritings.map((writing) => (
            <a
              key={writing.id}
              href="#"
              className="relative float-left w-[320px] h-[520px]
                             block overflow-hidden group"
            >
              <Image
                src={writing.attributes.Cover.data.attributes.formats.small.url}
                fill={true}
                className="object-cover object-cneter transition-transform duration-300
                              group-hover:scale-110"
                alt={writing.attributes.Title}
              />
              <div
                className="table h-full w-full text-[#fff] absolute
                              left-1/2 ml-[-50%] top-0 text-center z-[2]"
              >
                <div className="inline-block align-middle max-w-[222.6px] break-keep">
                  <strong className="title-pic">
                    {writing.attributes.Title}
                  </strong>
                  <span
                    className="font-noto_sans_light block leading-[20px] 
                    pt-[9px]"
                  >
                    {removeMarkdownImages(writing.attributes.Content).slice(
                      0,
                      20,
                    )}
                    <br />
                    {removeMarkdownImages(writing.attributes.Content).slice(
                      20,
                      34,
                    ) + '...'}
                  </span>
                  <span
                    className="w-[200px] block m-auto overflow-hidden 
                                whitespace-nowrap text-ellipsis text-[12px] opacity-80 pt-[30px]"
                  >
                    <span
                      className="bg-ico-brunch-main inline-block
                      w-[14px] h-[13px] mt-[3px] bg-[-38px_-130px] 
                      overflow-hidden indent-[-9999px] align-top leading-none"
                    >
                      by
                    </span>
                    {` ${writing.attributes.author.data.attributes.Name}`}
                  </span>
                </div>
                <div className="h-full overflow-hidden inline-block align-middle"></div>
              </div>
              <div
                className="absolute left-0 top-0 w-full h-full 
                              bg-[#333] opacity-40 transition-opacity duration-300 ease-in-out 
                              group-hover:opacity-50"
              ></div>
            </a>
          ))}
        </div>
      </li>
    </>
  )
}
