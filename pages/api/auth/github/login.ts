import { withIronSessionApiRoute } from 'iron-session/next'
import { frontUrl } from '@/lib/utils'
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
    res.clearPreviewData().redirect(backUrl || (frontUrl as string))
  },
  {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)