import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(
  async function handler(req:NextApiRequest, res:NextApiResponse) {
    const backUrl = `${process.env.FRONT_URL}${req.query['back']}`

    console.log('backUrl', backUrl)
    req.session.backUrl = backUrl
    await req.session.save()

    res.redirect(`${process.env.NEXT_PUBLIC_AUTH_GITHUB}`)
  },
  {
    cookieName: 'backUrl',
    password: process.env.SESSION_SECRET as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
)
