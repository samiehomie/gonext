'use client'
import useUser from '@/lib/useUser'
import useComment from '@/lib/useComment'
import { useState } from 'react'
import fetchJson from '@/lib/fetchJson'

export default function CommentButton({
  writingId,
  commentId,
  commentOwner,
  setIsForm
}: {
  writingId: string
  commentId: number
  commentOwner: number
  setIsForm: (arg: boolean) => void
}) {
  const { user: userMe } = useUser()
  const { mutateComments, reqUrl } = useComment({ writingId })
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    setIsLoading(true)
    await fetchJson(
      `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}/comment/${commentId}?authorId=${userMe?.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userMe?.jwt}`
        }
      }
    )
    mutateComments(await fetchJson(reqUrl), false)
    setIsLoading(false)
  }
  async function handleUpdate() {
    setIsLoading(true)
    await fetchJson(
      `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}/comment/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userMe?.jwt}`
        }
      }
    )
    mutateComments(await fetchJson(reqUrl), false)
    setIsLoading(false)
  }

  if (!userMe) return null

  return (
    <div
      className={`hidden ${
        userMe.id === commentOwner && !isLoading && 'group-hover:block'
      } absolute right-[18px] top-[-3px] ${isLoading && 'cursor-wait'}`}
    >
      <div>
        <button
          disabled={isLoading}
          onClick={() => setIsForm(true)}
          className="inline text-[#959595] float-left text-[12px] ml-[8px] align-middle"
        >
          수정
        </button>
        <button
          disabled={isLoading}
          onClick={handleDelete}
          className="inline text-[#959595] float-left text-[12px] ml-[8px] align-middle"
        >
          삭제
        </button>
      </div>
    </div>
  )
}
