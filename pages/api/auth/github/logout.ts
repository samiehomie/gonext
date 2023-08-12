import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import type { userSession } from '@/types'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<userSession>) {
  req.session.destroy()
  res.json({
    isLoggedIn: false,
    avatar: '',
    username: '',
    id: '',
    jwt: '',
    subscription: null,
    introduction: '',
    tags: null
  })
}
