import { withIronSessionApiRoute } from 'iron-session/next'
// import { frontUrl } from '@/lib/utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    const backUrl = 'http://localhost:3000' + req.query['back']
    console.log('backUrl', backUrl)
    req.session.destroy()
    res.redirect(req.query['back'] ? backUrl : 'http://localhost:3000')
  },
  {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)
