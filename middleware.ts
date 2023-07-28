import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession, sealData } from 'iron-session/edge'
import { strapiUserResponse } from '@/types'
import { sessionOptions } from '@/lib/session'
import { debounce } from 'lodash'
const debouncedFetch = debounce(fetch, 500)

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, sessionOptions)
  const { user } = session

  if (req.nextUrl.pathname === '/api/comment/create') {
    const path = req.nextUrl.searchParams.get('path')
    if (!user?.isLoggedIn) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONT_URL}${path}?signin`
      )
    }

    res.cookies.set('jwt', user.jwt, { path: '/api/comment/create' })
    return res
  }

  if (req.nextUrl.pathname === '/write') {
    if (!user?.isLoggedIn) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONT_URL}?signin`
      )
    }

    return res
  }

  // (1)
  if (req.nextUrl.pathname === '/api/auth/github/login/callback') {
    if (req.nextUrl.search.startsWith('?error')) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}`)
    }

    if (req.nextUrl.search.startsWith('?access_token')) {
      try {
        const accessToken = req.nextUrl.searchParams.get('access_token')

        if (!accessToken) {
          throw new Error(`There isn't a given access_token`)
        }
        console.log('access_github -------->', req.nextUrl.href)
        const res: Response = await debouncedFetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/api/auth/github/callback?access_token=` +
            accessToken
        )!
        if (!res.ok) {
          throw new Error('Failed to fetch user data')
        }
        const data: strapiUserResponse = await res.json()
        const dataSealed = await sealData(
          {
            id: data?.user?.id,
            username: data?.user?.username,
            avatar: data?.user?.profile?.url,
            isLoggedIn: true,
            jwt: data?.jwt
          },
          { password: process.env.SESSION_SECRET! }
        )

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/login?seal=${dataSealed}`
        )
      } catch (error) {
        console.error(error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}`)
      }
    }
  }
}
