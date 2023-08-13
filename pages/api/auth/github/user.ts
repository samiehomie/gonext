import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { userSession } from '@/types'

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<userSession>
) {
  if (req.session.user) {
    console.log('This is user api --->', req.session)
    res.json({
      ...req.session.user,
      isLoggedIn: true
    })
  } else {
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
}
