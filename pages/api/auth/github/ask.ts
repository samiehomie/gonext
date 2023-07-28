import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'

export default withIronSessionApiRoute(askRoute, sessionOptions)

async function askRoute(req: NextApiRequest, res: NextApiResponse) {
  const back = req.query.back!
  req.session.back = back as string
  await req.session.save()
  res.redirect(process.env.NEXT_PUBLIC_AUTH_GITHUB!)
}
