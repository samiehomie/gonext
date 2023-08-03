import { URL } from 'url'
import https from 'https'
import sizeOf from 'image-size'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type {
  dimensions,
  imgAttrsMDX,
  paraImgAttrsMDX,
  paraTextAttrsMDX
} from '@/types'

async function getImgSize(imgUrl: string) {
  const options = new URL(imgUrl)
  const dimensions = await new Promise((resolve) => {
    https.get(options, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve(sizeOf(buffer))
      })
    })
  })
  return dimensions as dimensions
}

const HorizonTalRule = () => {
  return (
    <div className="mt-[13px] w-full min-w-[940px]">
      <div className="m-auto w-[700px]">
        <hr
          className=" border-none leading-none h-[18px] 
                bg-line-type-03 bg-[50%_50%] bg-no-repeat"
        />
      </div>
    </div>
  )
}

const ResponsiveImage = async (props: imgAttrsMDX) => {
  const { width, height } = await getImgSize(props.src)
  return (
    <Image
      src={props.src}
      alt={props.alt || '본문 이미지'}
      width={width <= 700 ? width : 700}
      height={width <= 700 ? height : height * (700 / width)}
      className="block m-auto"
    />
  )
}

const ItemInParagraph = async (
  content: paraImgAttrsMDX['children'] | string
) => {
  console.dir('pi---->', content)
  switch (typeof content) {
    case 'string':
      return (
        <>
          <h4
            className="first:mt-[-7px] font-noto_sans_demlight text-[11pt] m-auto text-[#8d8d8d]
                  w-[700px] min-w-[700px] text-justify leading-[22pt] tracking-[.8px] peer-[.only-image]:mt-[13px]"
          >
            <div className="whitespace-pre-wrap">{content}</div>
          </h4>
          <h4
            className="first:mt-[-7px] font-noto_sans_demlight text-[11pt] m-auto 
                  w-[700px] min-w-[700px] text-justify leading-[22pt] tracking-[.8px]"
          >
            <br />
          </h4>
        </>
      )
    case 'object':
      const { width, height } = await getImgSize(content.props.src)
      const { src, alt } = content.props
      return (
        <div className="mt-[20px] w-full min-w-[940px] peer only-image">
          <div className="w-[700px] m-auto">
            <Image
              src={src}
              alt={alt || '본문 이미지'}
              width={width <= 700 ? width : 700}
              height={width <= 700 ? height : height * (700 / width)}
              className="m-auto my-[15px]"
            />
          </div>
        </div>
      )
  }
}

const Paragraph = async (
  props:
    | paraTextAttrsMDX
    | paraImgAttrsMDX
    | { children: (string | paraImgAttrsMDX['children'])[] }
) => {
  const { children: content } = props
  if (Array.isArray(content)) {
    return content.map((item, i) => <div key={i}>{ItemInParagraph(item)}</div>)
  }
  return await ItemInParagraph(content)
}

const components = {
  hr: HorizonTalRule,
  img: ResponsiveImage,
  p: Paragraph
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}

export default function Markdown({ content }: { content: string }) {
  console.log('----시작----')
  console.dir(content)
  console.log('----종료----')
  return <CustomMDX source={content} />
}
