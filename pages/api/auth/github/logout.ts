import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    const backUrl = process.env.NEXT_PUBLIC_FRONT_URL! + req.query['back']
    req.session.destroy()
    res.redirect(
      req.query['back'] ? backUrl : process.env.NEXT_PUBLIC_FRONT_URL!,
    )
  },
  {
    cookieName: 'user',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)
