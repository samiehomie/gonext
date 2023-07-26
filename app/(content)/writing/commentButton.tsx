'use client'

// TODO: fix

export default function CommentButton() {
  // const user = useSession('commentbutton')

  return (
    <div
      className={`hidden ${
        true && 'group-hover:block'
      } absolute right-[18px] top-[-3px]`}
    >
      <div>
        <button className="inline text-[#959595] float-left text-[12px] ml-[8px] align-middle">
          수정
        </button>
        <button className="inline text-[#959595] float-left text-[12px] ml-[8px] align-middle">
          삭제
        </button>
      </div>
    </div>
  )
}
