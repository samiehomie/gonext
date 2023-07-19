import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { domain, frontUrl } from '@/lib/utils'
import { jwtVerify, type JWTVerifyResult } from 'jose'


export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname === '/api/auth/github/session') {
    const res = NextResponse.next()
    const session = await getIronSession(req, res, {
      cookieName: 'user',
      password: process.env.SESSION_SECRET as string,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    })

    console.log('session->', session.user)
    return NextResponse.json(session.user || {}, { status: 200 })
  }
  if (req.nextUrl.pathname === '/api/auth/github/callback') {
    const res = NextResponse.next()
    const session = await getIronSession(req, res, {
      cookieName: 'backUrl',
      password: process.env.SESSION_SECRET as string,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    })

    if (req.nextUrl.search.startsWith('?error')) {
      return NextResponse.rewrite(`${session.backUrl || frontUrl}`)
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

        return NextResponse.redirect(`${frontUrl}/api/auth/github/login`, {
          headers: [
            [
              'Set-Cookie',
              `backUrl=${session.backUrl}; path=/; Domain=${domain}; HttpOnly;`,
            ],
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
        return NextResponse.rewrite(`${session.backUrl || frontUrl}`)
      }
    }
  }
}
