'use server'
import { cookies } from 'next/headers'
import { userSession } from '@/types'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UploadWidgetResult } from 'uploader/dist/components/modal/UploadWidgetResult'
import { sealData } from 'iron-session'
import fetchJson from './fetchJson'

export async function revalidateTagAction(tag: string) {
  revalidateTag(tag)
}

export async function deleteUploadImage(params: UploadWidgetResult) {
  const baseUrl = 'https://api.upload.io'
  const path = `/v2/accounts/${params.originalFile.accountId}/files`
  const query = `?filePath=${params.filePath}`
  const response = await fetch(`${baseUrl}${path}${query}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.UPLOAD_API_KEY}`
    }
  })
  if (Math.floor(response.status / 100) !== 2) {
    const result = await response.json()
    throw new Error(`Upload API Error: ${JSON.stringify(result)}`)
  }
}

export async function getSeal(user: userSession) {
  console.log('>>>>>>>>>>', user)
  const dataSealed = await sealData(user, {
    password: process.env.SESSION_SECRET!
  })
  // const resUser = await fetchJson<userSession>(
  //   `${process.env.NEXT_PUBLIC_FRONT_URL}/api/auth/github/login?seal=${dataSealed}`
  // )
  // console.log('>>>>>>>>>>', resUser)
  return dataSealed
}
