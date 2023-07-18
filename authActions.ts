'use server'
import { cookies } from 'next/headers'
import { domain } from '@/lib/utils'


export async function getSession() {
  const cookieStore = cookies()
  const userjwt = cookieStore.get('userjwt')?.value
  const username = cookieStore.get('username')?.value

  return { userjwt, username }
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
}
