'use client'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'

export default function CustomInput({
  menuColor
}: {
  menuColor: 'white' | 'black'
}) {
  return (
    <TextareaAutosize
      onInput={(e) => console.log(e)}
      placeholder="제목을 입력하세요"
      maxLength={30}
      className={`outline-none ml-[-3px] w-full text-[34pt] inline-block max-w-[700px] min-w-[100px]
                font-serif_mj leading-[40pt] word-wrap-break bg-transparent resize-none ${
                  menuColor === 'black' ? 'text-[#333]' : 'text-white'
                }`}
    />
  )
}
