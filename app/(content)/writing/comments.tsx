import Link from 'next/link'
import Image from 'next/image'
import type { commentsWithUser, users } from '@/types'
import { getEnglishDate, getCommentsQuery } from '@/lib/utils'

export default async function Comments({
  comments,
}: {
  comments: commentsWithUser
}) {
  const _commentUsers: users = await fetch(
    `${process.env.NEXT_PUBLIC_DB_URL}/api/users?${getCommentsQuery(comments)}`,
  ).then((res) => res.json())

  comments.forEach((comment) => {
    comment['user'] = _commentUsers.find(
      (user) => user.id === comment.author.id,
    )!
  })
  return (
    <>
      <h3 className="screen-out">댓글</h3>
      <div className="m-[0px_auto_13px] h-[30px] w-[700px]">
        <strong className="ml-[-1px] pt-[4px] float-left font-normal text-[16px]">
          댓글{' '}
          <span className="text-[#00c6be] pl-[5px] font-sf_light text-[16px] font-normal">
            {comments.length}
          </span>
        </strong>
      </div>
      <div className="m-auto w-[700px]">
        <ul className="block w-full border-t border-[#eee]">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="w-full p-[30px_0px_25px] float-left border-b 
                    border-[#eee] animation-up hover:bg-[#f8f8f8]"
            >
              <div>
                <Link
                  href={`/user/${comment.user.id}`}
                  className="ml-[18px] float-left h-[42px] overflow-visible 
                          relative w-[42px]"
                >
                  <Image
                    src={comment.user.profile?.formats.thumbnail.url!}
                    width={42}
                    height={42}
                    alt={comment.user.username}
                    className="rounded-[42px] bg-white block"
                  />
                </Link>
                <div className="pl-[16px] w-[618px] float-left relative">
                  <div className="text-[12px] leading-[14px] w-full">
                    <strong className="float-left text-[12px] leading-[14px]">
                      <Link
                        href={`/user/${comment.user.id}`}
                        className="font-normal font-noto_sans_light"
                      >
                        {comment.user.username}
                      </Link>
                    </strong>
                    <span
                      className="text-[#ddd] bg-[#e4e4e4] float-left h-[2px] 
                              m-[6px_4px_0px] w-[2px] align-top"
                    ></span>
                    <span className="font-noto_sans_light text-[#959595] float-left">
                      {getEnglishDate(comment.createdAt)}
                    </span>
                  </div>
                  <p
                    className="leading-[22px] p-[9px_20px_0px_0px] font-noto_sans_light 
                            word-wrap-break text-[14px] clear-left"
                  >
                    {comment.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
