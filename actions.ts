'use server'
// import { domain, frontUrl } from './lib/utils'
import { cookies } from 'next/headers'
import { userSession } from './types'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

const frontUrl = 'http://localhost:3000'
const domain = 'localhost'

export async function garbageCookiesDelete() {
  cookies().set({
    name: 'backUrl',
    value: '',
    domain: `${domain}`,
    httpOnly: true,
    expires: new Date('2016-10-05'),
    path: '/',
  })
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

export async function getSession() {
  const userCookie = cookies().get('user')?.value
  const response = await fetch(`${frontUrl}/api/auth/github/session`, {
    headers: { Accept: 'application / json', Cookie: `user=${userCookie}` },
  })
  const userData: userSession = await response.json()
  return userData
}

export async function saveWriting(formData: FormData) {
  const content = formData.get('content')?.toString() || ''
  const title = formData.get('title')?.toString() || ''
  const subtitle = formData.get('subtitle')?.toString() || ''
  const created = formData.get('created')?.toString() || ''
  const tags = formData.get('tags')?.toString() || ''
  const user = await getSession()

  if (!user.jwt) {
    console.log('unautherized!')
    return redirect(`/?signin`)
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/api/writings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        title: title,
        subtitle: subtitle,
        user: `${user.id}`,
        content: content,
        tags: tags,
        created: created,
      },
    }),
  })

  if (data.ok) {
    revalidateTag('userPage')
    return redirect(`/${user.id}`)
  }

  const response = await data.json()
  console.error('unexpected error', response)
}