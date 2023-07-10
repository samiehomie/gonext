import type { writings } from '@/types'
import Article from '@/components/bookpage/article'

export default function ArticleList({
  writings,
}: {
  writings: writings['data'] | undefined
}) {
  return (
    <>
      {writings &&
        writings.map((writing, index) => (
          <Article key={writing.id} writing={writing} index={index} />
        ))}
    </>
  )
}
