import Form from '@/components/form'
import fetchJson from '@/lib/fetchJson'
import type { writing } from '@/types'
// @ts-ignore
import { getColorFromURL } from 'color-thief-node/src/color-thief'

export default async function ReadyWritePage({
  params: { writingId }
}: {
  params: { writingId: string }
}) {
  const writingData: writing = await fetchJson(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/writings/${writingId}?populate[cover]=true`,
    { next: { tags: ['readyWrite'] } }
  )

  if (writingData.data.attributes.cover?.data) {
    const imgUrl = writingData.data.attributes.cover?.data.attributes.url
    const color = await getColorFromURL(imgUrl)
    const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000
    const isDark = brightness < 128
    console.log('dark?', isDark, color)
    return (
      <Form
        writingData={writingData}
        coverUrl={imgUrl}
        initialMenuColor={isDark ? 'white' : 'black'}
        isWrite={false}
      />
    )
  }

  return <Form writingData={writingData} isWrite={false} />
}
