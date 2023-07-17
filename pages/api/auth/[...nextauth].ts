import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHub, { GithubProfile } from 'next-auth/providers/github'
import { NextApiRequest, NextApiResponse } from 'next'

const options: NextAuthOptions = {
  secret: process.env.JWT_SECRET as string,
  providers: [
    GitHub({
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'read:user user:email' },
      },
      profile: (profile: GithubProfile) => ({
        id: profile.id.toString(),
        email: profile.email,
      }),
      checks: 'none',
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
  session: {
    strategy: 'jwt',
  },
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
      console.log('what', token, user)

      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/api/auth/github/callback?access_token=${account?.access_token}`,
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
