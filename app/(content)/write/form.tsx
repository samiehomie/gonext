'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { getColor } from 'color-thief-react'
import TopNavigation from '@/components/navigations/topNavigation'
import ContentEditable from 'react-contenteditable'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import { getDateString } from '@/lib/utils'
import { UploadButton } from 'react-uploader'
import type { UploadWidgetResult } from 'uploader/dist/components/modal/UploadWidgetResult'
import { Uploader } from 'uploader'
import { deleteUploadImage } from '@/actions'

export default function Form() {
  const [menuColor, setMenuColor] = useState('white')
  const [cover, setCover] = useState<Blob | null>(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user: userMe, mutateUser } = useUser()

  const imgInputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef('')
  const subTitleRef = useRef('')
  const contentRef = useRef('')

  const handleColor = async (url: string) => {
    const color = await getColor(url, 'rgbArray', 'anonymous')
    const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000
    const isDark = brightness < 128

    if (isDark) {
      setMenuColor('white')
    } else {
      setMenuColor('black')
    }
  }

  const handleTitle = (e: any) => {
    titleRef.current = e.target.value
    setTitle(e.target.value)
  }
  const handleSubTitle = (e: any) => {
    subTitleRef.current = e.target.value
    setSubTitle(e.target.value)
  }
  const handleContent = (e: any) => {
    contentRef.current = e.target.value
    setContent(e.target.value)
  }

  async function handleSubmit() {
    setIsLoading(true)
    const formData = new FormData()
    const data = {
      title: title,
      subtitle: subTitle,
      user: `${userMe!.id}`,
      content: content,
      created: getDateString()
    }
    console.log('data', typeof cover)
    formData.append(`files.cover`, cover!, cover!.name)
    formData.append('data', JSON.stringify(data))
    try {
      await fetchJson(`${process.env.NEXT_PUBLIC_DB_URL}/api/writings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userMe!.jwt}`
        },
        body: formData
      })
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  return (
    <div
      className={`${
        isLoading &&
        'opacity-60 pointer-events-none cursor-wait z-[15000] w-full h-full'
      }`}
    >
      <TopNavigation
        isBlack={menuColor === 'black'}
        inWrite={true}
        breakpoint={0}
      >
        <div className="float-right mt-[30px] mr-[111px]">
          <div className="mt-[-4px] pt-[2.5px] inline-block relative top-[-4px]">
            <span className="text-[#666] text-[12px] ">
              <button
                disabled={isLoading || !title || !content}
                onClick={handleSubmit}
                className="mt-[-1px] border-b border-[#bbb] mr-[5px] bg-white rounded-[15px] 
                          h-[30px] w-[66px] leading-[25px] disabled:opacity-70"
              >
                저장
              </button>
            </span>
          </div>
        </div>
      </TopNavigation>

      <div className="min-w-[940px] font-noto_sans_demlight text-[13px]">
        {/* title section */}
        <div
          className={`h-[450px] border-b border-[#eee] relative ${
            !cover && 'bg-black'
          }`}
        >
          {/* cover image */}
          {cover && (
            <Image
              src={URL.createObjectURL(cover)}
              fill={true}
              alt={'cover'}
              className="object-cover"
              id="cover-image"
            />
          )}

          <div className="h-[450px] bg-black opacity-30 absolute top-0 left-0 w-full"></div>
          <div
            className="text-left absolute bottom-0 right-[50%] w-[700px] z-[11] 
                translate-x-[50%] translate-y-[-80px]"
          >
            {/* 대제목 입력란 */}
            <ContentEditable
              html={titleRef.current}
              onChange={handleTitle}
              id="write-title"
              className={`outline-none ml-[-3px] text-[34pt] inline-block max-w-[700px] min-w-[100px] 
                  font-serif_mj leading-[40pt] word-wrap-break ${
                    menuColor === 'black' ? 'text-[#ccc]' : 'text-white'
                  }`}
            />

            {!title && (
              <span
                onClick={() => {
                  const title = document.getElementById('write-title')
                  title?.focus()
                }}
                className={`font-serif_mj cursor-text box-border leading-[40pt] opacity-60 
                word-wrap-break text-[38pt] inline-block absolute w-full left-0 ${
                  menuColor === 'black' ? 'text-[#ccc]' : 'text-white'
                }`}
              >
                제목을 입력하세요
              </span>
            )}
            <br />
            {/* 소제목 입력란 */}
            <ContentEditable
              html={subTitleRef.current}
              id="write-subtitle"
              onChange={handleSubTitle}
              className={`outline-none inline-block max-w-[700px] min-w-[100px] text-[12pt] leading-[18pt] 
                  opacity-80 pt-[10px] word-wrap-break ${
                    menuColor === 'black' ? 'text-[#b9b9b9]' : 'text-white'
                  }`}
            />

            {!subTitle && (
              <span
                onClick={() => {
                  const subtitle = document.getElementById('write-subtitle')
                  subtitle?.focus()
                }}
                className={`cursor-text box-border leading-[18pt] opacity-60 
                word-wrap-break text-[12pt] inline-block absolute w-full left-0 bottom-0 ${
                  menuColor === 'black' ? 'text-[#ccc]' : 'text-white'
                }`}
              >
                소제목을 입력하세요
              </span>
            )}
          </div>
        </div>

        {/* content section */}
        <div
          className="min-h-[300px] m-auto relative w-[700px] pt-[40px] pb-[120px] 
              word-wrap-break text-[#333] text-[11pt] leading-[22pt] 
              tracking-[.8px] text-left"
        >
          <ContentEditable
            html={contentRef.current}
            onChange={handleContent}
            className="outline-none mt-[-7px] m-auto w-auto min-w-fit min-h-[300px]"
          />
        </div>
      </div>
      {/* top buttons */}
      <div className="inline-block left-1/2 absolute top-[90px] translate-x-[479px] z-[9999]">
        <div className="left-0 absolute top-0 w-[41px] z-[3]">
          <div className="relative z-[1]">
            {/* cover insert button */}
            <label
              className="z-0 relative mt-[1px] bg-clip-padding inline-block 
                          rounded-none h-[35px] py-[2px] text-center w-[42px]"
            >
              <i
                className={`bg-ico-btn-cover cursor-pointer inline-block h-[25px] w-[25px] ${
                  menuColor === 'black' ? 'bg-[0px_0px]' : 'bg-[-29px_0px]'
                }`}
              />
              <input
                ref={imgInputRef}
                type="file"
                accept="image/*"
                className={`hidden`}
                onChange={(e) => {
                  setCover(e.target.files![0])
                  handleColor(URL.createObjectURL(e.target.files![0]))
                }}
              />
            </label>
            {/* cover remove button */}
            {cover && (
              <div
                className="z-0 relative mt-[1px] bg-clip-padding inline-block 
                          rounded-none h-[35px] py-[2px] text-center w-[42px]"
              >
                <button
                  onClick={async () => {
                    setCover(null)
                    imgInputRef.current!.value = ''
                    setMenuColor('white')
                  }}
                  className={`bg-ico-btn-cover cursor-pointer inline-block h-[25px] w-[25px] ${
                    menuColor === 'black'
                      ? 'bg-[0px_-249px]'
                      : 'bg-[-29px_-249px]'
                  }`}
                ></button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed top-[487px] left-1/2 inline-block z-[9999] translate-x-[479px]">
        <div className="bg-white rounded-[2px] h-[340px] left-[3px] opacity-95 absolute top-[-4px] w-[38px]"></div>
        <div className="absolute left-0 top-0 w-[41px]">
          <div className="relative z-[1]">
            {/* image insert button */}
            <button className="mt-[1px] bg-clip-padding cursor-pointer inline-block h-[35px] py-[2px] text-center w-[42px]">
              <i className=" inline-block w-[25px] h-[25px] bg-ico-btn-cover2 bg-[0px_0px]"></i>
            </button>
            {/* line insert button */}
            <button className="mt-[1px] bg-clip-padding cursor-pointer inline-block h-[35px] py-[2px] text-center w-[42px]">
              <i className=" inline-block w-[25px] h-[25px] bg-ico-btn-cover2 bg-[0px_-249px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
