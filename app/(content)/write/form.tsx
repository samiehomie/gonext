'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { getColor } from 'color-thief-react'
import TopNavigation from '@/components/navigations/topNavigation'
import ContentEditable from 'react-contenteditable'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import { getDateString } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Uploader } from 'uploader'
import { deleteUploadImage, revalidateTagAction } from '@/actions'
import TuiEditor from './editor'
import type { Editor } from '@toast-ui/react-editor'
import { HookCallback } from '@toast-ui/editor/types/editor'
import Toast from '@/components/toast'
import sanitizeHtml from 'sanitize-html'

const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY!
})

export default function Form() {
  const router = useRouter()
  const [menuColor, setMenuColor] = useState('white')
  const [cover, setCover] = useState<Blob | null>(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [block, setBlock] = useState(false)
  const { user: userMe } = useUser()

  const imgInputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef('')
  const subTitleRef = useRef('')
  const editorRef = useRef<Editor>(null)

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
  const handleImage = async (blob: Blob | File, callback: HookCallback) => {
    setIsLoading(true)
    const response = await uploader.uploadFile(blob)
    callback(response.fileUrl)
    setIsLoading(false)
  }

  const handleTitle = (e: any) => {
    titleRef.current = e.target.value
    setTitle(e.target.value)
  }
  const handleSubTitle = (e: any) => {
    subTitleRef.current = e.target.value
    setSubTitle(e.target.value)
  }

  async function handleSubmit() {
    setIsLoading(true)
    const markdownContent = editorRef.current?.getInstance().getMarkdown()!

    if (!title || !markdownContent) {
      setIsLoading(false)
      setBlock(true)
      return setTimeout(() => {
        setBlock(false)
      }, 1200)
    }
    const formData = new FormData()
    // toast-editor에서 사용자 입력한 html 태그 이스케이프를 위한 역슬래쉬 제거하여
    // 모든 사용자 입력 html 태그 제거 위함
    const contentData = markdownContent.replace(/\\(<[a-zA-Z]+.*?>)/g, '$1')
    const data = {
      title: title,
      subtitle: subTitle,
      user: `${userMe!.id}`,
      content: sanitizeHtml(contentData, {
        transformTags: {
          br: '\n'
        }
      }),
      created: getDateString(),
      publishedAt: null
    }
    if (cover) {
      formData.append(`files.cover`, cover, cover.name || '커버 이미지')
    }

    formData.append('data', JSON.stringify(data))
    try {
      await fetchJson(`${process.env.NEXT_PUBLIC_DB_URL}/api/writings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userMe!.jwt}`
        },
        body: formData
      })
      await revalidateTagAction('userPage')
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
    setIsLoading(false)

    router.push(`/user/${userMe!.id}`)
  }

  return (
    <>
      {isLoading && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-white 
                    opacity-50 cursor-wait z-[100000] pointer-events-none"
        />
      )}
      <Toast isShow={block} message="내용을 입력하세요" />
      <TopNavigation isBlack={menuColor === 'black'} inWrite={true}>
        <div className="float-right mr-[111px] table h-full">
          <span className="text-[#00c6be] text-[12px] table-cell align-middle">
            <button
              onClick={handleSubmit}
              className={`mt-[-1px] border border-[#00c6be] mr-[5px] bg-white rounded-[15px] 
                          h-[30px] w-[66px] leading-[25px]`}
            >
              {isLoading ? '저장중' : '저장'}
            </button>
          </span>
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
          className="min-h-[300px] m-auto relative w-[700px] pt-[40px]  
              word-wrap-break text-[#333] text-[11pt] leading-[22pt] 
              tracking-[.8px] text-left"
        >
          <div
            id="editor-wrapper"
            className="outline-none mt-[-7px] m-auto w-auto min-w-fit min-h-[300px]"
          >
            <TuiEditor editorRef={editorRef} imageHandler={handleImage} />
          </div>
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
    </>
  )
}
