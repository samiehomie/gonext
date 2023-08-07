'use client'
import useSWR from 'swr'
import fetchJson from '@/lib/fetchJson'
import { commentsWithUser } from '@/types'

export default function useComment({ writingId }: { writingId: string }) {
  const reqUrl = `/api/comment?writingId=${writingId}`
  const { data: comments, mutate: mutateComments } = useSWR<commentsWithUser>(
    reqUrl,
    fetchJson
  )

  return { comments, mutateComments, reqUrl }
}
