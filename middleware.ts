import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { jwtVerify, type JWTVerifyResult } from 'jose'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const sessionUser = await getIronSession(req, res, {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })

  if (req.nextUrl.pathname === '/write') {
    if (!sessionUser.user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONT_URL}?signin`,
      )
    }
    return res
  }
  if (req.nextUrl.pathname === '/api/auth/github/session') {
    return NextResponse.json(sessionUser.user || {}, { status: 200 })
  }

  // (1) strapi ->
  if (req.nextUrl.pathname === '/api/auth/github/callback') {
    const sessionBackUrl = await getIronSession(req, res, {
      cookieName: 'backUrl',
      password: process.env.SESSION_SECRET as string,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    })
    if (req.nextUrl.search.startsWith('?error')) {
      return NextResponse.redirect(
        `${sessionBackUrl.backUrl || process.env.NEXT_PUBLIC_FRONT_URL}`,
      )
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

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/login`,
          {
            headers: [
              [
                'Set-Cookie',
                `backUrl=${sessionBackUrl.backUrl}; path=/; Domain=${process.env.DOMAIN}; HttpOnly;`,
              ],
              [
                'Set-Cookie',
                `userid=${decoded.payload.id}; path=/; Domain=${process.env.DOMAIN}; HttpOnly; Expires=${expires}`,
              ],
              [
                'Set-Cookie',
                `userjwt=${data.jwt}; path=/; Domain=${process.env.DOMAIN}; HttpOnly; Expires=${expires}`,
              ],
              [
                'Set-Cookie',
                `username=${data.user.username}; path=/; Domain=${process.env.DOMAIN}; HttpOnly; Expires=${expires}`,
              ],
            ],
          },
        )
      } catch (error) {
        console.error(error)
        return NextResponse.redirect(
          `${sessionBackUrl.backUrl || process.env.NEXT_PUBLIC_FRONT_URL}`,
        )
      }
    }
  }
}
