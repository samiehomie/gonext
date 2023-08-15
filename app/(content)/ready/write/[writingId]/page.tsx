import Form from '@/components/form'
import fetchJson from '@/lib/fetchJson'
import type { writing } from '@/types'

export default async function ReadyWritePage({
  params: { writingId }
}: {
  params: { writingId: string }
}) {
  const writingData: writing = await fetchJson(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/writings/${writingId}?populate[cover]=true`,
    { next: { tags: [`writing_${writingId}`] } }
  )

  if (writingData.data.attributes.cover?.data) {
    const imgUrl = writingData.data.attributes.cover?.data.attributes.url

    return <Form writingData={writingData} coverUrl={imgUrl} isWrite={false} />
  }

  return <Form writingData={writingData} isWrite={false} />
}
