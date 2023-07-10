import Overview from '@/components/bookpage/overview'
import { book } from '@/types'
import { queryBook } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import ArticleList from '@/components/bookpage/articleList'

export default async function BookPage({
  params: { bookId },
}: {
  params: { bookId: string }
}) {
  const bookData: book = await getData(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/books/${bookId}?${queryBook}`,
  )
  const writings = bookData.data.attributes.writings?.data
  return (
    <div className="font-noto_sans_demlight">
      <Overview bookData={bookData}>
        <ArticleList writings={writings} />
      </Overview>
    </div>
  )
}
