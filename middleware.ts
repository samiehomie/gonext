import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { domain, frontUrl } from './lib/utils'

let backUrl: string | undefined

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth/github')) {
    backUrl = `${frontUrl}${req.nextUrl.searchParams.get('back')}`

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_GITHUB}`)
  }

  if (req.nextUrl.pathname.startsWith('/api/callback/github')) {
    try {
      const { searchParams } = new URL(req.url)
      const accessToken = searchParams.get('access_token')
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
      console.log(data)
      const { exp } = jwt.decode(data.jwt) as JwtPayload
      const expires = new Date((exp as number) * 1000).toUTCString()

      return NextResponse.redirect(`${backUrl || frontUrl}`, {
        headers: [
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
      return NextResponse.redirect(`${backUrl || frontUrl}`)
    }
  }
}
