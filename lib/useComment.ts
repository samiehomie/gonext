'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { commentsWithUser } from '@/types'

export default function useComment({ writingId }: { writingId: string }) {
  const { data: comments, mutate: mutateComments } = useSWR<commentsWithUser>(
    `/api/comment?writingId=${writingId}`,
    fetchJson
  )

  return { comments, mutateComments }
}
