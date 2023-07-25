'use client'
import Image from 'next/image'
import ContentEditable from 'react-contenteditable'
import { useState, useRef, useTransition } from 'react'
import defaultImg from '@/public/default.jpg'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/utils'

export default function CommentForm({
  userId,
  writingId,
}: {
  userId: string
  writingId: string
}) {
  const router = useRouter()
  const text = useRef('')
  const handleChange = (evt: any) => {
    text.current = evt.target.value
    setInput(evt.target.value)
  }
  const [input, setInput] = useState<string | null>('')
  const [isPending, startTransition] = useTransition()
  const user = useSession()

  function handleClick() {
    startTransition(() => {
      fetch(
        `/api/comment/create?content=${input}&path=/writing/${userId}/${writingId}&writingId=${writingId}`,
      ).then(() => router.refresh())
      setInput('')
      text.current = ''
    })
  }

  if (!user) return null

  return (
    <div className="clear-both text-[14px]">
      <fieldset className="pt-[20px] m-auto relative w-[700px]">
        <legend className="screen-out">댓글 작성 폼</legend>
        <div
          className="ml-[18px] mt-[6px] float-left h-[42px] overflow-visible 
                    relative w-[42px]"
        >
          <Image
            src={user.avatar}
            width={42}
            height={42}
            alt={user.username}
            className="rounded-[42px] bg-white block"
          />
        </div>
        <div
          className="bg-white border border-[#eee] float-right 
                  relative w-[624px]"
        >
          <label className="screen-out">댓글 작성</label>
          <span className="block">
            <ContentEditable
              disabled={isPending}
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
                공감과 응원의 댓글은 작가에게 큰 힘이 됩니다.
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
              <button
                disabled={isPending || !input}
                onClick={handleClick}
                className="opacity-90 bg-white w-[56px] ml-[5px] leading-[28px] h-[30px] 
                            text-[12px] text-[#666] rounded-[32px] border border-[#bbb]"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
