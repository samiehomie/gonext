import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { strapiUserResponse } from '@/types'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  })

  if (req.nextUrl.pathname === '/api/comment/create') {
    const path = req.nextUrl.search.startsWith('path')
    if (!session || !session.user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONT_URL}${path}?signin`,
      )
    }

    res.cookies.set('jwt', session.user.jwt, { path: '/api/comment/create' })
    return res
  }

  if (req.nextUrl.pathname === '/write') {
    if (!session || !session.user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONT_URL}?signin`,
      )
    }

    return res
  }
  if (req.nextUrl.pathname === '/api/auth/github/session') {
    return NextResponse.json(session.user || null, { status: 200 })
  }

  // (1) strapi ->
  if (req.nextUrl.pathname === '/api/auth/github/callback') {
    if (req.nextUrl.search.startsWith('?error')) {
      return NextResponse.redirect(
        `${session.backUrl || process.env.NEXT_PUBLIC_FRONT_URL}`,
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
        const data: strapiUserResponse = await res.json()
        console.log(data)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/login`,
          {
            headers: [
              [
                'Set-Cookie',
                `avatar=${data.user.profile.url}; path=/api/auth/github/login; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; HttpOnly;`,
              ],
              [
                'Set-Cookie',
                `backUrlp=${session.backUrl}; path=/api/auth/github/login; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; HttpOnly;`,
              ],
              [
                'Set-Cookie',
                `userid=${data.user.id}; path=/api/auth/github/login; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; HttpOnly;`,
              ],
              [
                'Set-Cookie',
                `userjwt=${data.jwt}; path=/api/auth/github/login; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; HttpOnly;`,
              ],
              [
                'Set-Cookie',
                `username=${data.user.username}; path=/api/auth/github/login; Domain=${process.env.NEXT_PUBLIC_DOMAIN}; HttpOnly;`,
              ],
            ],
          },
        )
      } catch (error) {
        console.error(error)
        return NextResponse.redirect(
          `${session.backUrl || process.env.NEXT_PUBLIC_FRONT_URL}`,
        )
      }
    }
  }
}
