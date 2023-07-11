import Profile from '@/components/author/profile'
import { queryAuthor } from '@/lib/queries'
import { getData } from '@/lib/fetchData'
import { author } from '@/types'
import TopNavigation from '@/components/navigations/topNavigation'
import Link from 'next/link'
import Image from 'next/image'
import Content from '@/components/author/content'

export default async function AuthorPage({
  params: { authorId },
}: {
  params: { authorId: string }
}) {
  const authorData: author = await getData(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/authors/${authorId}?${queryAuthor}`,
  )
  return (
    <>
      <TopNavigation inBookPage={true}>
        <div className="absolute text-center left-[250px] right-[250px] h-full">
          <div className="table h-full mx-auto">
            <h2
              className="text-[#666] font-noto_sans_light text-[16.5px] leading-none
                      font-normal whitespace-nowrap align-middle table-cell tracking-tight"
            >
              <Link href={`/${authorId}`}>
                <Image
                  src={
                    authorData.data.attributes.Profile?.data.attributes.formats
                      .small.url as string
                  }
                  alt={authorData.data.attributes.Name}
                  width={30}
                  height={30}
                  className="rounded-full inline-block mr-[6px]"
                />
                <span
                  className="text-[#333] inline-block pt-[5px] align-top 
                              whitespace-nowrap font-noto_sans_demlight text-[17px] tracking-[-1px]"
                >
                  {authorData.data.attributes.Name}
                </span>
              </Link>
            </h2>
          </div>
        </div>
      </TopNavigation>
      <Profile authorData={authorData} />
      <Content authorData={authorData} />
    </>
  )
}
