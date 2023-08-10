import TopNavigation from '@/components/navigations/topNavigation'
import fetchJson from '@/lib/fetchJson'
import { getUsersFilteredQuery } from '@/lib/queries'
import UserCard from '../../(components)/userCard'
import type { users } from '@/types'

export default async function KeywordPage({
  params: { word }
}: {
  params: { word: string }
}) {
  const keyword = decodeURIComponent(word)
  const query = getUsersFilteredQuery(keyword)
  const users = await fetchJson<users>(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users?` + query
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
                {users.map((user, i) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={i + 1}
                    keyword={keyword}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
