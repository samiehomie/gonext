'use client'
import Image from 'next/image'
import ContentEditable from 'react-contenteditable'
import { useState, useRef, useEffect } from 'react'
import useUser from '@/lib/useUser'
import useComment from '@/lib/useComment'
import fetchJson from '@/lib/fetchJson'
import { useRouter } from 'next/navigation'

export default function CommentForm({
  writingId,
  setIsForm,
  commentId,
  commentContent
}: {
  writingId: string
  setIsForm?: (arg: boolean) => void
  commentId?: number
  commentContent?: string
}) {
  const { mutateComments, reqUrl } = useComment({ writingId })
  const { user: userMe } = useUser()
  const router = useRouter()
  const text = useRef('')
  const [input, setInput] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (evt: any) => {
    text.current = evt.target.value
    setInput(evt.target.value)
  }

  async function handleCreate() {
    setIsLoading(true)
    await fetchJson(
      `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userMe?.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: input
        })
      }
    )
    mutateComments(await fetchJson(reqUrl), false)
    setIsLoading(false)
    setInput('')
    text.current = ''
  }
  async function handleUpdate() {
    setIsLoading(true)
    await fetchJson(
      `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}/comment/${commentId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userMe?.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: input
        })
      }
    )
    mutateComments(await fetchJson(reqUrl), false)
    setIsLoading(false)
    setIsForm!(false)
  }

  useEffect(() => {
    if (setIsForm) {
      setInput(commentContent!)
      text.current = commentContent!
    }
  }, [setIsForm, commentContent])

  if (!userMe) return null

  return (
    <div className="clear-both text-[14px]">
      <fieldset
        className={`${
          !setIsForm
            ? 'pt-[20px] m-auto relative w-[700px]'
            : 'w-full p-[30px_0px_25px] float-left border-b border-[#eee]'
        } ${!userMe.isLoggedIn && ' cursor-pointer'}`}
        onClick={(e) => {
          e.preventDefault()
          if (!userMe.isLoggedIn) {
            router.push('?signin')
          }
        }}
      >
        <legend className="screen-out">댓글 작성 폼</legend>
        <div
          className="ml-[18px] mt-[6px] float-left h-[42px] overflow-visible 
                    relative w-[42px]"
        >
          {userMe.isLoggedIn && (
            <Image
              src={userMe.avatar}
              width={42}
              height={42}
              alt={userMe.username}
              className="rounded-[42px] bg-white block"
            />
          )}
        </div>
        <div
          className={`bg-white border border-[#eee] float-right 
                  relative ${userMe.isLoggedIn ? 'w-[624px]' : 'w-[698px]'} ${
            isLoading && ' opacity-50'
          }`}
        >
          <label className="screen-out">댓글 작성</label>
          <span className="block">
            <ContentEditable
              disabled={isLoading || !userMe.isLoggedIn}
              id="comment-input"
              html={text.current}
              onChange={handleChange}
              className={`p-[15px_19px_0px] word-wrap-break bg-transparent 
                      leading-[22px] min-h-[45px] outline-dotted outline-transparent 
                      whitespace-pre-wrap w-[590px] border-none`}
            />
            {!input && (
              <div
                onClick={() => {
                  const input = document.getElementById('comment-input')
                  input?.focus()
                }}
                className="text-[#959595] left-[18px] leading-[22px] absolute 
                      top-[15px] z-0 select-none"
              >
                {userMe.isLoggedIn
                  ? '공감과 응원의 댓글은 작가에게 큰 힘이 됩니다.'
                  : '브런치에 로그인하고 댓글을 입력해보세요!'}
              </div>
            )}
            <textarea
              maxLength={1000}
              placeholder="공감과 응원의 댓글은 작가에게 큰 힘이 됩니다."
              name="content"
              className="hidden"
            ></textarea>
          </span>
          <div
            className="p-[14px_19px_0px] h-[44px]"
            onClick={() => {
              const input = document.getElementById('comment-input')
              input?.focus()
            }}
          >
            <div className="float-right">
              {setIsForm && (
                <button
                  disabled={isLoading || !userMe.isLoggedIn}
                  onClick={() => setIsForm(false)}
                  className={`opacity-90 bg-white w-[56px] ml-[5px] leading-[28px] h-[30px] 
                            text-[12px] rounded-[32px] 
                            border border-[#bbb] text-[#666]`}
                >
                  취소
                </button>
              )}
              <button
                disabled={isLoading || !input || !userMe.isLoggedIn}
                onClick={setIsForm ? handleUpdate : handleCreate}
                className={`opacity-90 bg-white w-[56px] ml-[5px] leading-[28px] h-[30px] 
                            text-[12px] rounded-[32px] 
                            border ${
                              isLoading || !input || !userMe.isLoggedIn
                                ? 'border-[#bbb] text-[#666]'
                                : 'border-[#00c6be] text-[#00c6be]'
                            }`}
              >
                {setIsForm ? '수정' : '확인'}
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
