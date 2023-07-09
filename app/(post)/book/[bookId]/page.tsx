import Overview from '@/components/bookpage/overview'
import { book } from '@/types'
import { queryBook } from '@/lib/queries'
import { getData } from '@/lib/fetchData'

export default async function BookPage({
  params: { bookId },
}: {
  params: { bookId: string }
}) {
  const bookData: book = await getData(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/books/${bookId}?${queryBook}`,
  )
  return (
    <div className="font-noto_sans_light">
      <Overview bookData={bookData}/>
    </div>
  )
}
