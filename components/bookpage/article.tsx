import type { writing } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function Article({
  writing,
  index,
}: {
  writing: writing['data']
  index: number
}) {
  return (
    <div className="m-auto w-[1000px] animation-up-late">
      <Link
        href={`/${writing.attributes.author?.data.id}/${writing.id}`}
        className="float-right h-[146px] mr-[150px] w-[700px] relative pt-[32px]"
      >
        <em
          className="absolute not-italic font-normal font-sf_light text-[20px] 
                  left-0 w-[50px] top-[31px] leading-[29px] text-[#333]"
        >
          {`${index + 1}`.padStart(2, '0')}
        </em>
        <div
          className="float-right w-[120px] h-[120px] pl-[30px] 
                  mt-[-3px] overflow-hidden"
        >
          <div className="relative w-[120px] h-[120px]">
            <Image
              src={writing.attributes.Cover?.data.attributes.url as string}
              alt={writing.attributes.Title}
              fill={true}
              className="object-cover"
            />
          </div>
        </div>
        <div className="overflow-hidden pl-[50px]">
          <strong
            className="block text-[20px] font-normal tracking-[-1px] leading-[25px] 
                    overflow-hidden pt-[1px] text-ellipsis break-words w-full text-[#333]"
          >
            {writing.attributes.Title}
          </strong>
          <p
            className="txt-writer text-[#959595] text-[14px] h-[40px] tracking-[-1px] 
                    leading-[21px] overflow-hidden pt-[8px]"
          >
            <em
              className={`not-italic font-normal text-[14px] text-[#666] 
                      leading-[21px] tracking-[-1px] after:text-[#ddd] after:content-["ㅣ"]
                      after:inline-block after:mx-[4px]`}
            >
              {writing.attributes.Subtitle}
            </em>
            <span>{writing.attributes.Content.slice(0, 200)}</span>
          </p>
        </div>
        <dl
          className="absolute left-[50px] bottom-[38px] inline-block text-[0px] 
                  leading-none align-top"
        >
          <dt className="p-[2px_3px_0px_0px] align-top inline-block pr-[5px]">
            <span
              className="bg-ico-brunch-sub2 bg-[-160px_-250px] h-[13px] 
                      w-[13px] inline-block align-top leading-none overflow-hidden indent-[-9999px]"
            >
              전체시간
            </span>
          </dt>
          <dd className="leading-[17px] text-[12px] text-[#959595] inline-block align-top">
            <em className="font-sf_light font-normal not-italic text-[13px] leading-[17px]">
              2
            </em>
            분
          </dd>
        </dl>
      </Link>
    </div>
  )
}
