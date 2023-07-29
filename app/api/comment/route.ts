import { NextResponse, NextRequest } from 'next/server'
import fetchJson from '@/lib/fetchJson'
import { commentsWithUser, users } from '@/types'
import { getCommentsQuery } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const writingId = req.nextUrl.searchParams.get('writingId')

  const comments: commentsWithUser = await fetchJson(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}`
  )
  const url = `${
    process.env.NEXT_PUBLIC_DB_URL
  }/api/users?${getCommentsQuery(comments)}`
  const _commentUsers: users = await fetchJson(url)

  comments.forEach((comment) => {
    comment.user = _commentUsers.find(
      (user) => user.id === comment.author.id
    )!
  })

  return NextResponse.json(comments)
}
