import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, type JWTVerifyResult } from 'jose'
import { domain, frontUrl } from '@/lib/utils'
import { getIronSession } from 'iron-session/edge'

export async function GET(req: NextRequest) {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'backUrl',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })

  if (req.nextUrl.search.startsWith('?error')) {
    return NextResponse.redirect(`${session.backUrl || frontUrl}`)
  }

  if (req.nextUrl.search.startsWith('?access_token')) {
    try {
      const accessToken = req.nextUrl.searchParams.get('access_token')

      if (!accessToken) {
        throw new Error(`There isn't a given access_token`)
      }
      
      const res: Response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/api/auth/github/callback?access_token=` +
          accessToken,
      )
      if (!res.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data = await res.json()
      const decoded: JWTVerifyResult = await jwtVerify(
        data.jwt as string,
        new TextEncoder().encode(process.env.JWT_SECRET),
      )

      const expires = new Date(
        (decoded.payload.exp as number) * 1000,
      ).toUTCString()

      return NextResponse.redirect(`${session.backUrl || frontUrl}`, {
        headers: [
          [
            'Set-Cookie',
            `userid=${decoded.payload.id}; path=/; Domain=${domain}; HttpOnly; Expires=${expires}`,
          ],
          [
            'Set-Cookie',
            `userjwt=${data.jwt}; path=/; Domain=${domain}; HttpOnly; Expires=${expires}`,
          ],
          [
            'Set-Cookie',
            `username=${data.user.username}; path=/; Domain=${domain}; HttpOnly; Expires=${expires}`,
          ],
        ],
      })
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(`${session.backUrl || frontUrl}`)
    }
  }
}
