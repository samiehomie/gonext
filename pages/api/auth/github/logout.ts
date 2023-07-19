import { withIronSessionApiRoute } from 'iron-session/next'
import { frontUrl } from '@/lib/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    const backUrl = req.cookies['backUrl']
    req.session.destroy()
    res.redirect(backUrl || (frontUrl as string))
  },
  {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)
