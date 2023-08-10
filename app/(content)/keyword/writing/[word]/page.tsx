import TopNavigation from '@/components/navigations/topNavigation'
import fetchJson from '@/lib/fetchJson'
import { queryWritingsFilteredTag } from '@/lib/queries'
import WritingCard from '../../(components)/writingCard'
import type { writings } from '@/types'

export default async function KeywordPage({
  params: { word }
}: {
  params: { word: string }
}) {
  const keyword = decodeURIComponent(word)
  const query = queryWritingsFilteredTag + keyword
  const writings = await fetchJson<writings>(
    `${process.env.NEXT_PUBLIC_DB_URL}` + query
  )
  return (
    <>
      <TopNavigation
        isBlack={true}
        showBrunch={true}
        showButtons={true}
        breakpoint={162}
      >
        <div
          className=" font-noto_sans_light text-[30px] translate-x-[-50%] w-full -z-10
                    tracking-[-1px] text-[#333] absolute text-center left-1/2 h-[160px]"
        >
          <div className="h-full w-full bg-transparent table text-center">
            <span
              className="table-cell align-middle border-b border-[#ddd]
                        group-[.fixed]:hidden"
            >
              {keyword}
            </span>
          </div>
        </div>
      </TopNavigation>
      <div className="mt-[160px]">
        <div className="min-h-[771px] bg-[#fbfbfb] pt-[10px]">
          <div className="font-noto_sans_demlight w-[940px] overflow-hidden m-auto">
            <div className="p-[26px_0px_33px] w-[940px] overflow-hidden">
              <ul className="overflow-hidden">
                {writings.data.length > 0 &&
                  writings.data.map((writing, i) => (
                    <WritingCard key={writing.id} writing={writing} index={i} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
