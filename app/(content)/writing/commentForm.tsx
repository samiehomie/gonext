'use client'
import Image from 'next/image'
import ContentEditable from 'react-contenteditable'
import { useState, useRef } from 'react'
import defaultImg from '@/public/default.jpg'
import { saveComment } from '@/actions'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function CommentForm({
  userId,
  writingId,
}: {
  userId: string
  writingId: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const text = useRef('')
  const handleChange = (evt: any) => {
    text.current = evt.target.value
    setInput(evt.target.value)
  }
  const { pending } = useFormStatus()
  const [input, setInput] = useState<any>('')
  return (
    <div className="clear-both text-[14px]">
      <form
        action={async (formData) => {
          await saveComment(formData, `/${userId}/${writingId}`, writingId)
          formRef.current?.reset()
        }}
        className="pt-[20px] m-auto relative w-[700px]"
        ref={formRef}
      >
        <fieldset className="">
          <legend className="screen-out">댓글 작성 폼</legend>
          <div
            className="ml-[18px] mt-[6px] float-left h-[42px] overflow-visible 
                    relative w-[42px]"
          >
            <Image
              src={defaultImg}
              width={42}
              height={42}
              alt={'test'}
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
                disabled={pending}
                id="comment-input"
                html={text.current}
                onChange={handleChange}
                className=" p-[15px_19px_0px] word-wrap-break bg-transparent 
                      leading-[22px] min-h-[45px] outline-dotted outline-transparent 
                      whitespace-pre-wrap w-[590px] border-none"
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
                value={input}
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
                  disabled={pending}
                  type="submit"
                  className="opacity-90 bg-white w-[56px] ml-[5px] leading-[28px] h-[30px] 
                            text-[12px] text-[#666] rounded-[32px] border border-[#bbb]"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
