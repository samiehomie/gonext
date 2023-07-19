'use server'
import { cookies } from 'next/headers'
import { domain } from '@/lib/utils'
import { jwtVerify, type JWTVerifyResult } from 'jose'

export async function getSession() {
  const cookieStore = cookies()
  const userjwt = cookieStore.get('userjwt')?.value
  const username = cookieStore.get('username')?.value
  const userid = cookieStore.get('userid')?.value

  return { userjwt, username, userid }
}

export async function parseJwtId() {
  const cookieStore = cookies()
  const userjwt = cookieStore.get('userjwt')?.value
  const decoded: JWTVerifyResult = await jwtVerify(
    userjwt as string,
    new TextEncoder().encode(process.env.JWT_SECRET),
  )
  return decoded.payload.id
}



export async function logOut() {
  cookies().set({
    name: 'userjwt',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    httpOnly: true,
    domain: domain,
  })
  cookies().set({
    name: 'username',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    httpOnly: true,
    domain: domain,
  })
  cookies().set({
    name: 'userid',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    httpOnly: true,
    domain: domain,
  })
}
