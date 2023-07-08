import { URL } from 'url'
import https from 'https'
import sizeOf from 'image-size'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import type {
  dimensions,
  imgAttrsMDX,
  paraImgAttrsMDX,
  paraTextAttrsMDX,
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

const components = {
  hr: () => {
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
  },
  img: async (props: imgAttrsMDX) => {
    const { width, height } = await getImgSize(props.src)
    return (
      <Image
        src={props.src}
        alt={props.alt}
        width={width <= 700 ? width : 700}
        height={width <= 700 ? height : height * (700 / width)}
        className="block m-auto"
      />
    )
  },
  p: async (props: paraTextAttrsMDX | paraImgAttrsMDX) => {
    console.log('p', props)
    if (
      props.children instanceof Object &&
      Object.hasOwn(props.children, 'type') &&
      typeof props.children.type === 'function'
    ) {
      const { width, height } = await getImgSize(props.children.props.src)
      const { src, alt } = props.children.props
      return (
        <div className="mt-[20px] w-full min-w-[940px] peer only-image">
          <div className="w-[700px] m-auto">
            <Image
              src={src}
              alt={alt}
              width={width <= 700 ? width : 700}
              height={width <= 700 ? height : height * (700 / width)}
              className="m-auto"
            />
          </div>
        </div>
      )
    } else {
      return (
        <>
          <h4
            className="first:mt-[-7px] font-noto_sans_light text-[11pt] m-auto text-[#8d8d8d]
                    w-[700px] min-w-[700px] text-justify leading-[22pt] tracking-[.8px] peer-[.only-image]:mt-[13px]"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: (props.children as string).replaceAll('\n', '<br />'),
              }}
            />
          </h4>
          <h4
            className="first:mt-[-7px] font-noto_sans_light text-[11pt] m-auto 
                    w-[700px] min-w-[700px] text-justify leading-[22pt] tracking-[.8px]"
          >
            <br />
          </h4>
        </>
      )
    }
  },
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
  return <CustomMDX source={content} />
}
