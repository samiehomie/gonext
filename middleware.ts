import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession, sealData } from 'iron-session/edge'
import { strapiUserResponse } from '@/types'
import { sessionOptions } from '@/lib/session'
import defaultImg from '@/public/default.png'
// import { debounce } from 'lodash'
// const debouncedFetch = debounce(fetch, 1000)

declare module 'iron-session' {
  interface IronSessionData {
    user: {
      jwt: string
      username: string
      id: number | string
      avatar: string
      isLoggedIn: boolean
      subscription: null | number
      introduction: string
      tags: null | string[]
    }
    back?: string
  }
}

const regexAuth = /^\/(write|ready|me)/

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, sessionOptions)
  const { user, back } = session
  console.log('middleware ----->', user)
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

  if (regexAuth.test(req.nextUrl.pathname)) {
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

        const res: Response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/api/auth/github/callback?access_token=` +
            accessToken
        )!

        if (!res.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data: strapiUserResponse = await res.json()
        const dataSealed = await sealData(
          {
            id: data.user.id,
            username: data.user.username,
            avatar: data.user.profile?.url,
            isLoggedIn: true,
            jwt: data.jwt,
            subscription: data.user.subscription?.id,
            introduction: data.user.introduction,
            tags: data.user.tags
          },
          { password: process.env.SESSION_SECRET! }
        )

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_FRONT_URL}${back || ''}?seal=${dataSealed}`
        )
      } catch (error) {
        console.error(error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}`)
      }
    }
  }
}
