import { getQueryWritingPage } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import type { author } from '@/types'

export default async function Page({
  params: { userId, writingId },
}: {
  params: { userId: string; writingId: string }
}) {
  const [target, others] = getQueryWritingPage(userId, writingId)
  const writing: author = await getData(target)
  const otherWritings: author = await getData(others)
  return (
    <div>
      <div>{writing.data.attributes.writings?.data[0].attributes.Title}</div>
      <div>{writing.data.attributes.writings?.data[0].attributes.Content}</div>
    </div>
  )
}
