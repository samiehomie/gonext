import NextAuth, { AuthOptions, SessionOptions } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { NextApiRequest, NextApiResponse } from 'next'

const options: AuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      client: {
        client_id: process.env.GITHUB_CLIENT_ID as string,
        client_secret: process.env.GITHUB_CLIENT_SECRET as string,
        redirect_uris: [
          'https://strapi-pyj2.onrender.com/api/connect/github/callback',
        ],
      },
    }),
  ],
  // @ts-ignore
  database: process.env.NEXT_PUBLIC_DB_URL,
  session: {
    strategy: 'jwt',
  },
  debug: true,
  callbacks: {
    // @ts-ignore
    async session({ session, token, user }) {
      // @ts-ignore
      session.jwt = token.jwt
      // @ts-ignore
      session.id = token.id

      return session
    },
    // @ts-ignore
    async jwt({ token, user, account, profile }) {
      const isSignIn = user ? true : false

      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/api/auth/github/callback?access_token=${account?.accessToken}`,
        )

        const data = await response.json()

        token.jwt = data.jwt
        token.id = data.user.id
      }

      return token
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
