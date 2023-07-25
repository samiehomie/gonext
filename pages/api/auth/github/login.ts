import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { jwtVerify, type JWTVerifyResult } from 'jose'

async function getExpires(jwt: string) {
  const decoded: JWTVerifyResult = await jwtVerify(
    jwt as string,
    new TextEncoder().encode(process.env.JWT_SECRET),
  )
  console.log('date', decoded.payload.exp! * 1000)
  return new Date(decoded.payload.exp! * 1000)
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const backUrl = req.cookies['backUrlp']
    const id = req.cookies['userid'] as string
    const jwt = req.cookies['userjwt'] as string
    const username = req.cookies['username'] as string
    req.session.user = {
      id,
      jwt,
      username,
    }
    await req.session.save()
    res.redirect(backUrl || process.env.NEXT_PUBLIC_FRONT_URL!)
  },
  async (req: NextApiRequest, res: NextApiResponse) => ({
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      expires: await getExpires(req.cookies['userjwt']!),
    },
  }),
)
