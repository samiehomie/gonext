import Overview from '@/components/bookpage/overview'
import { book, users } from '@/types'
import { queryBook, queryUser } from '@/lib/queries'
import ArticleList from '@/components/bookpage/articleList'

export default async function BookPage({
  params: { bookId },
}: {
  params: { bookId: string }
}) {
  const bookData: book = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/books/${bookId}?${queryBook}`,
  ).then((res) => res.json())
  const writings = bookData.data.attributes.writings?.data
  return (
    <div className="font-noto_sans_demlight">
      <Overview bookData={bookData}>
        <ArticleList writings={writings} />
      </Overview>
    </div>
  )
}

export const revalidate = 3600

export async function generateStaticParams() {
  const reqUrl = `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${queryUser}`
  const users: users = await fetch(reqUrl).then((res) => res.json())
  const books = users.flatMap((user) => user.books)
  return books.map((book) => ({
    bookId: `${book?.id}`,
  }))
}
