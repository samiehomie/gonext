import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'
import { unsealData } from 'iron-session'
import { userSession } from '@/types'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const seal = req.query.seal as string
    const user = await unsealData<userSession>(seal, {
      password: process.env.SESSION_SECRET!
    })

    // const id = req.cookies['id'] as string
    // const jwt = req.cookies['jwt'] as string
    // const username = req.cookies['username'] as string
    // const avatar = req.cookies['avatar'] as string
    // const user = {
    //   isLoggedIn: true,
    //   id,
    //   jwt,
    //   username,
    //   avatar
    // }

    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
