'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { getColor } from 'color-thief-react'
import TopNavigation from '@/components/navigations/topNavigation'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import { getDateString } from '@/lib/utils'
import { Uploader } from 'uploader'
import { revalidateTagAction } from '@/lib/actions'
import TuiEditor from '@/components/editor'
import type { Editor } from '@toast-ui/react-editor'
import { HookCallback } from '@toast-ui/editor/types/editor'
import Toast from '@/components/toast'
import sanitizeHtml from 'sanitize-html'
import Link from 'next/link'
import type { writing, resCreateWriting } from '@/types'
import { toolbar } from '@/components/editor'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import TagInput from '@/components/tagInput'

const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY!
})

export default function Form({
  writingData,
  coverUrl,
  initialMenuColor = 'white',
  isWrite = true
}: {
  writingData?: writing
  coverUrl?: string
  initialMenuColor?: 'white' | 'black'
  isWrite?: boolean
}) {
  const [menuColor, setMenuColor] = useState(initialMenuColor)
  const [cover, setCover] = useState<Blob | null | string>(coverUrl!)
  const [isLoading, setIsLoading] = useState(false)
  const [block, setBlock] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const { user: userMe } = useUser()
  const [onWrite, setOnWrite] = useState(isWrite)
  const [updateId, setUpdateId] = useState(
    writingData ? writingData.data.id : null
  )
  const titleInitial = writingData ? writingData.data.attributes.title : ''
  const subTitleInitial = writingData
    ? writingData.data.attributes.subtitle
      ? writingData.data.attributes.subtitle
      : ''
    : ''
  const imgInputRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef(titleInitial)
  const subTitleRef = useRef(subTitleInitial)
  const editorRef = useRef<Editor>(null)
  const tagsRef = useRef<string[] | null | undefined>()

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

  function restoreToolbar() {
    editorRef.current
      ?.getInstance()
      .insertToolbarItem({ groupIndex: 0, itemIndex: 0 }, toolbar[0][0])
    editorRef.current
      ?.getInstance()
      .insertToolbarItem({ groupIndex: 0, itemIndex: 1 }, toolbar[0][1])
  }
  async function handleSubmit(
    e: any,
    type: 'delete' | 'update' | 'publish' | 'create'
  ) {
    setIsLoading(true)
    const markdownContent = editorRef.current?.getInstance().getMarkdown()!

    if (!titleRef.current || !markdownContent) {
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

    const dataSubset =
      type === 'delete'
        ? {
            publishedAt: null,
            tags: ['_delete']
          }
        : type === 'publish'
        ? {
            publishedAt: getDateString()
          }
        : { publishedAt: null }

    const data = {
      title: titleRef.current,
      subtitle: subTitleRef.current,
      user: `${userMe!.id}`,
      content: sanitizeHtml(contentData, {
        transformTags: {
          br: '\n'
        }
      }),
      tags: tagsRef.current ? tagsRef.current : [],
      created: getDateString(),
      ...dataSubset
    }

    if (cover instanceof Blob) {
      formData.append(`files.cover`, cover, cover.name || '커버 이미지')
    }

    formData.append('data', JSON.stringify(data))
    const reqUrl =
      type === 'create' && !updateId
        ? `${process.env.NEXT_PUBLIC_DB_URL}/api/writings`
        : `${process.env.NEXT_PUBLIC_DB_URL}/api/writings/${updateId}`
    const method = type === 'create' && !updateId ? 'POST' : 'PUT'
    try {
      const resData = await fetchJson<resCreateWriting>(reqUrl, {
        method: method,
        headers: {
          Authorization: `Bearer ${userMe!.jwt}`
        },
        body: formData
      })
      setUpdateId(resData.data.id)
      await revalidateTagAction(`userPage_${userMe!.id}`)
      if (writingData) {
        await revalidateTagAction(`writing_${writingData.data.id}`)
      }
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }

    setIsDone(true)
    setIsLoading(false)
    editorRef.current?.getInstance().removeToolbarItem('구분선')
    editorRef.current?.getInstance().removeToolbarItem('image')
  }

  useEffect(() => {
    if (coverUrl) {
      handleColor(coverUrl)
    }
  }, [coverUrl])

  if (!userMe) return null

  return (
    <>
      {isLoading && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-white 
                    opacity-50 cursor-wait z-[100000] pointer-events-none"
        />
      )}
      <Toast isShow={block} message="내용을 입력하세요" />
      <TopNavigation
        isBlack={menuColor === 'black'}
        showButtons={true}
        showBrunch={true}
      >
        {isDone ? (
          <div className="float-right mr-[111px] table h-full">
            <span className="text-[#00c6be] text-[12px] table-cell align-middle">
              <Link
                href="/ready"
                className={`border inline-block border-[#bbb] bg-white rounded-[15px] 
                h-[30px] w-[114px] leading-[30px] text-[#666] align-middle text-center`}
              >
                작가의 서랍 가기
              </Link>
            </span>
          </div>
        ) : onWrite ? (
          <div className="float-right mr-[111px] table h-full">
            <span className="text-[#00c6be] text-[12px] table-cell align-middle">
              <button
                onClick={(e) => handleSubmit(e, updateId ? 'update' : 'create')}
                className={`mt-[-1px] border border-[#00c6be] mr-[5px] bg-white rounded-[15px] 
                          h-[30px] w-[66px] leading-[25px]`}
              >
                {isLoading ? '저장중' : '저장'}
              </button>
            </span>
          </div>
        ) : (
          <div
            className="mr-[-8px] absolute right-[25px] font-noto_sans_demlight text-[12px] table h-full 
                  translate-x-0 transition-transform duration-300"
          >
            <div
              className={`opacity-100 table-cell align-middle 
             ${menuColor === 'black' ? 'text-[#666]' : 'text-white'}`}
            >
              <button
                onClick={() => {
                  setOnWrite(true)
                  restoreToolbar()
                }}
                className="ml-[18px] inline-block box-content float-left h-[20px] p-[5px_0px_5px_5px]"
              >
                <span
                  className={`bg-ico-brunch-sub h-[20px] w-[20px] mx-[5px] inline-block overflow-hidden 
                leading-none indent-[-9999px] ${
                  menuColor === 'black'
                    ? 'bg-[0px_-150px]'
                    : 'bg-[-30px_-150px]'
                }`}
                >
                  편집
                </span>
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'delete')}
                className="ml-[18px] inline-block box-content float-left h-[20px] p-[5px_0px_5px_5px]"
              >
                <span
                  className={`bg-ico-brunch-sub h-[20px] w-[20px] mx-[5px] inline-block overflow-hidden 
                leading-none indent-[-9999px] ${
                  menuColor === 'black'
                    ? 'bg-[-60px_-150px]'
                    : 'bg-[-90px_-150px]'
                }`}
                >
                  삭제
                </span>
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'publish')}
                className={`pb-[2px] h-[30px] w-[56px] ml-[21px] mr-[10px] inline-block float-left 
              bg-ico-brunch-sub bg-[-180px_-60px] text-[#666]`}
              >
                발행
              </button>
            </div>
          </div>
        )}
      </TopNavigation>

      <div
        onInput={() => {
          if (isDone) {
            setIsDone(false)
            restoreToolbar()
          }
        }}
        className={`min-w-[940px] font-noto_sans_demlight text-[13px] ${
          !onWrite && 'pointer-events-none'
        }`}
      >
        {/* title section */}
        <div
          className={`h-[450px] border-b border-[#eee] relative ${
            !cover && 'bg-black'
          }`}
        >
          {/* cover image */}
          {cover && (
            <Image
              src={
                typeof cover === 'string'
                  ? cover
                  : URL.createObjectURL(cover as Blob)
              }
              fill={true}
              alt={'cover'}
              className="object-cover"
              id="cover-image"
            />
          )}

          <div className="h-[450px] bg-black opacity-30 absolute top-0 left-0 w-full"></div>
          <div
            className={`text-left absolute bottom-0 right-[50%] w-[700px] z-[11] 
                translate-x-[50%] translate-y-[-80px]`}
          >
            {/* 제목 입력란 */}
            <TextareaAutosize
              onInput={(e) => {
                titleRef.current = e.currentTarget.value
              }}
              defaultValue={titleInitial}
              placeholder="제목을 입력하세요"
              maxLength={30}
              className={`outline-none ml-[-3px] w-full text-[34pt] inline-block max-w-[700px] min-w-[100px]
                font-serif_mj leading-[40pt] word-wrap-break bg-transparent resize-none ${
                  menuColor === 'black' ? 'text-[#333]' : 'text-white'
                }`}
            />
            <br />
            <TextareaAutosize
              onInput={(e) => {
                subTitleRef.current = e.currentTarget.value
              }}
              defaultValue={subTitleInitial}
              placeholder="소제목을 입력하세요"
              maxLength={30}
              className={`outline-none inline-block max-w-[700px] min-w-[100px] text-[12pt] leading-[18pt] 
              opacity-80 pt-[10px] word-wrap-break w-full bg-transparent resize-none ${
                menuColor === 'black' ? 'text-[#333]' : 'text-white'
              }`}
            />
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
            className={`outline-none mt-[-7px] m-auto w-auto min-w-fit min-h-[300px]`}
          >
            <div className="pb-[6px] mt-[-15px] border-b border-[#eee] bg-white overflow-hidden">
              <TagInput
                initialTags={writingData && writingData.data.attributes.tags}
                tagsRef={tagsRef}
                isLoading={isLoading}
                readOnly={!onWrite}
              />
            </div>

            <p
              className={`${
                onWrite ? 'text-[#959595]' : 'text-transparent'
              } text-[12px] leading-[20px] overflow-hidden mb-[50px] opacity-60 select-none`}
            >
              {` 쉼표와 엔터키로 구분하여 최대 5개의 태그를 입력할 수 있습니다.`}
            </p>

            <TuiEditor
              editorRef={editorRef}
              imageHandler={handleImage}
              content={writingData ? writingData.data.attributes.content : ' '}
              onWrite={isWrite}
            />
          </div>
        </div>

        {/* top buttons */}
        {onWrite && (
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
        )}
      </div>
    </>
  )
}
