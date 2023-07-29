'use client'
import { useState } from 'react'
import type { user } from '@/types'
import CommentForm from './commentForm'
import Comments from './comments'
import useComment from '@/lib/useComment'

export default function CommentContainer({
  user,
  userId,
  writingId
}: {
  user: user
  userId: string
  writingId: string
}) {
  const [open, setOpen] = useState(false)
  const { comments } = useComment({ writingId })

  if (!comments) return null

  return (
    <>
      <div className={`bg-white relative pb-[54px]`}>
        {/* tags */}
        <div>
          <div>
            <div
              className="mt-[80px] mx-auto text-right w-[700px] 
                after:content-[''] after:block after:clear-both"
            >
              <div className="float-left pt-[6px] bg-white overflow-hidden relative">
                <strong className="leading-none overflow-hidden indent-[-9999px] h-0 w-0 absolute">
                  keyword
                </strong>
                <ul className="float-left">
                  {user.writings![0].tags.map((tag, i) => (
                    <li key={tag + i} className="float-left mb-[8px] mr-[8px]">
                      <a href="#" className="writing-tag tracking-[-.5px]">
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="inline-block ">
                <button
                  className="comment-button"
                  onClick={() => setOpen(!open)}
                >
                  <span
                    className="bg-ico-article-buttons bg-[0px_0px] bg-[length:80px_80px] 
                      h-[20px] w-[20px] mr-[3px] inline-block align-top"
                  ></span>
                  <span>댓글</span>
                  <span className="font-sf_light text-[#00c6be] ml-[3px]">
                    {comments.length}
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-white min-w-[1020px] pt-[44px] pb-[142px] relative font-noto_sans_light ${
          open ? 'block' : 'hidden'
        }`}
      >
        <h3 className="screen-out">댓글</h3>
        <div className="m-[0px_auto_13px] h-[30px] w-[700px]">
          <strong className="ml-[-1px] pt-[4px] float-left font-normal text-[16px]">
            댓글{' '}
            <span className="text-[#00c6be] pl-[5px] font-sf_light text-[16px] font-normal">
              {comments.length}
            </span>
          </strong>
        </div>
        <Comments writingId={writingId} />
        <CommentForm writingId={writingId} />
      </div>
    </>
  )
}
