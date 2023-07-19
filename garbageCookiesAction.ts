'use server'
import { domain } from '@/lib/utils'
import { cookies } from 'next/headers'

export async function garbageCookiesDelete() {
  cookies().set({
    name: 'userjwt',
    value: '',
    domain: `${domain}`,
    httpOnly: true,
    expires: new Date('2016-10-05'),
    path: '/',
  })
  cookies().set({
    name: 'username',
    value: '',
    domain: `${domain}`,
    httpOnly: true,
    expires: new Date('2016-10-05'),
    path: '/',
  })
  cookies().set({
    name: 'userid',
    value: '',
    domain: `${domain}`,
    httpOnly: true,
    expires: new Date('2016-10-05'),
    path: '/',
  })
}
