import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
let reqRef: string | undefined
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/auth/github/sex/sex/sex')) {
    reqRef = `${process.env.FRONT_END_URL}${req.nextUrl.searchParams.get(
      'back',
    )}`

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_AUTH_GITHUB}`)
  }

  if (req.nextUrl.pathname.startsWith('/auth/github/redirect/sex/sex')) {
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

      return NextResponse.redirect(`${reqRef || process.env.FRONT_END_URL}`, {
        headers: {
          'Set-Cookie': `userjwt=${data.jwt}; path=/; Domain=${process.env.DOMAIN}; Expires=${expires}`,
        },
      })
    } catch (error) {
      console.error(error)
      return NextResponse.redirect(`${reqRef || process.env.FRONT_END_URL}`)
    }
  }
}
