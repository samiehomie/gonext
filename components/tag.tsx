import Link from 'next/link'

export default function Tag({ tagName }: { tagName: string }) {
  return (
    <Link
      href="#"
      className="border border-[#ddd] rounded-[20px] text-[#959595]
            text-[12px] tracking-[-1px] py-[4px] px-[10px] 
            inline-block font-noto_sans_demlight"
    >
      {tagName}
    </Link>
  )
}
