import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const backUrl = req.cookies['backUrl']
    const id = req.cookies['userid'] as string
    const jwt = req.cookies['userjwt'] as string
    const username = req.cookies['username'] as string
    req.session.user = {
      id,
      jwt,
      username,
    }
    await req.session.save()
    res.redirect(backUrl || process.env.FRONT_URL!)
  },
  {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)
