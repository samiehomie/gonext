import { NextResponse, NextRequest } from 'next/server'

import { revalidateTag } from 'next/cache'

export async function GET(req: NextRequest) {
  revalidateTag('comments')
  const content = req.nextUrl.searchParams.get('content')
  const writingId = req.nextUrl.searchParams.get('writingId')
  const jwt = req.cookies.get('jwt')

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/comments/api::writing.writing:${writingId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt?.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    },
  ).then((res) => res.json())
  return NextResponse.json({ ...data })
}
