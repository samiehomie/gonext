import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, type JWTVerifyResult } from 'jose'
import { domain, frontUrl } from './lib/utils'

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/api/auth') &&
    req.nextUrl.search.startsWith('back')
  ) {
    const backUrl = `${frontUrl}${req.nextUrl.searchParams.get('back')}`
    req.cookies.set('backurl', backUrl)
  }
  if (req.nextUrl.pathname === '/api/auth/github') {
    console.log('bac', req.cookies.get('backurl'))
    return NextResponse.rewrite(`${process.env.NEXT_PUBLIC_AUTH_GITHUB}`)
    // const userjwt = req.cookies.get('userjwt')
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_GITHUB}`, {
    //   headers: [['Authorization', `Bearer ${userjwt?.value}`]],
    // })
  }

  if (req.nextUrl.pathname === '/api/auth/github/callback') {
    const backUrl = req.cookies.get('backurl')
    console.log('back', backUrl)
    if (req.nextUrl.search.startsWith('?error')) {
      return NextResponse.redirect(`${backUrl?.value || frontUrl}`)
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

        return NextResponse.redirect(`${backUrl?.value || frontUrl}`, {
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
        return NextResponse.redirect(`${backUrl?.value || frontUrl}`)
      }
    }
  }
}
