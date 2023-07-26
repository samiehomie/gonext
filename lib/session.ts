import type { IronSessionOptions } from 'iron-session'

export const sessionOptions: IronSessionOptions = {
  cookieName: 'user',
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
