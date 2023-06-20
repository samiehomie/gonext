'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import closeButtonX from '../../public/closebtnx.svg'

const slidesBack = {
  white: 'https://i.ibb.co/TggLD59/topbanner-back-white.png',
  black: 'https://i.ibb.co/gr5pJd4/topbanner-back-black.png',
  bigWhite: 'https://i.ibb.co/J7Nvrby/topbanner1-big-back-white.png',
  bigBlack: 'https://i.ibb.co/19nMznv/topbanner1-big-back-black.png',
}

const slidesInfo = [
  {
    src: 'https://i.ibb.co/pyj5YrN/topbanner3-text.png',
    key: 'pyj5YrN',
    alt: 'topbanner3-text',
    back: slidesBack.white,
    white: true,
    active: true,
    big: {
      src: 'https://i.ibb.co/pjZ7Yfb/topbanner3-big.png',
      alt: 'topbanner3-big-text',
      back: slidesBack.bigWhite,
    },
  },
  {
    src: 'https://i.ibb.co/LRQcx08/topbanner2-text.png',
    key: 'LRQcx08',
    alt: 'topbanner2-text',
    back: slidesBack.black,
    white: false,
    active: false,
    big: {
      src: 'https://i.ibb.co/vqrtP5m/topbanner2-big.png',
      alt: 'topbanner2-big-text',
      back: slidesBack.bigBlack,
    },
  },
  {
    src: 'https://i.ibb.co/7p1RBK6/topbanner1-text.png',
    key: '7p1RBK6',
    alt: 'topbanner1-text',
    back: slidesBack.white,
    white: true,
    active: false,
    big: {
      src: 'https://i.ibb.co/NNVkqPB/topbanner1-big.png',
      alt: 'topbanner1-big-text',
      back: slidesBack.bigWhite,
    },
  },
]

function InnerPaging({
  slides,
  currentSlide,
  isWhite,
  isBig,
  onChnageSlide,
}: {
  slides: typeof slidesInfo
  currentSlide: string
  isWhite: boolean | undefined
  isBig: boolean
  onChnageSlide: (slideKey: string) => void
}) {
  return (
    <div
      className={`absolute table w-[12px] 
    ml-[470px] z-[5] left-[50%] ${
      isBig ? 'bottom-[180px] h-[120px]' : 'bottom-0 h-[60px]'
    } text-center select-none`}
    >
      <div className="table-cell align-middle">
        {slides.map((slide) => {
          if (currentSlide === slide.key) {
            return (
              <span
                key={slide.key}
                className={`inline-block ${
                  isBig ? 'h-[47px]' : 'h-[4px]'
                } w-[24px] p-[4px] float-left align-top box-content`}
              >
                <span
                  className={`inline-block ${
                    isBig
                      ? 'w-[4px] h-[47px] rounded-lg'
                      : 'w-[4px] h-[4px] rounded-full'
                  } 
                  align-top overflow-hidden ${
                    isWhite ? 'bg-zinc-500' : 'bg-zinc-50'
                  }`}
                ></span>
              </span>
            )
          }
          return (
            <a
              key={slide.key}
              href="#"
              className={`inline-block ${
                isBig ? 'h-[24px]' : 'h-[4px]'
              } w-[24px] p-[4px] float-left align-top box-content`}
              onClick={() => onChnageSlide(slide.key)}
            >
              <span
                className={`inline-block ${
                  isBig
                    ? 'w-[4px] h-[24px] rounded-lg'
                    : 'w-[4px] h-[4px] rounded-full'
                } 
                align-top overflow-hidden ${
                  isWhite ? 'bg-zinc-300' : 'bg-zinc-500'
                }`}
              ></span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function TopBanner() {
  const slidesRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(slidesInfo[0].key)
  const [slideIsBig, setSlideIsBig] = useState(false)
  const [pastSlide, setPastSlide] = useState('')

  const handlerWheel =
    (cbForBig: () => void, cbForSmall: () => void, elem: HTMLUListElement) =>
    (event: WheelEvent) => {
      if (window.scrollY === 0 && event.deltaY < 0) {
        cbForBig()
      }

      if (window.scrollY >= 480 && elem.offsetTop === 0) {
        cbForSmall()
      }
    }

  useEffect(() => {
    const { current } = slidesRef
    if (current === null) return
    const slideNodes = [...current.children]
    let nextIndex: number
    const timeId = setTimeout(() => {
      if (slideIsBig) {
        return
      }
      slideNodes.forEach((node, index) => {
        if (node instanceof HTMLElement) {
          if (currentSlide === node.dataset.key) {
            node.classList.add('translate-y-[-60px]', 'z-[3]')
            nextIndex = index + 1 === slideNodes.length ? 0 : index + 1
            setPastSlide(currentSlide)
            setCurrentSlide(slidesInfo[nextIndex].key)
          }
        }
      })
    }, 4000)
    return () => {
      clearTimeout(timeId)
    }
  }, [currentSlide, slideIsBig])

  useEffect(() => {
    const { current: containerNode } = containerRef
    const { current: slidesNode } = slidesRef
    if (containerNode === null || slidesNode === null) return
    const handler = handlerWheel(
      () => {
        setPastSlide('')
        setSlideIsBig(true)
      },
      () => setSlideIsBig(false),
      slidesNode,
    )
    containerNode.addEventListener('wheel', handler)

    return () => {
      containerNode.removeEventListener('wheel', handler)
    }
  }, [])

  const currentSlideColor = slidesInfo.find(
    (slide) => slide.key === currentSlide,
  )?.white
  return (
    <div ref={containerRef} className="overflow-y-scroll overflow-x-auto">
      <div
        className={`relative overflow-hidden transition-margin duration-700 linear ${
          slideIsBig ? 'mt-0' : 'mt-[-420px]'
        }`}
      >
        <ul
          ref={slidesRef}
          className={`relative h-[480px] overflow-hidden
          
        `}
        >
          {slidesInfo.map((slide) => (
            <li
              key={slide.key}
              data-key={slide.key}
              className={`absolute h-[100%] w-[100%] 
          ${
            !slideIsBig && 'transition-transform duration-700 linear'
          } overflow-hidden
          ${
            slide.key === pastSlide
              ? 'translate-y-[-60px] z-[3]'
              : slide.key === currentSlide
              ? 'z-[2]'
              : 'translate-y-[60px] z-[1] invisible'
          }`}
            >
              <a href="#" className="h-[480px] w-[100%]">
                <Image src={slide.big.back} alt={slide.big.alt} fill={true} />
                <Image
                  src={slide.big.src}
                  alt={slide.big.alt}
                  width={960}
                  height={480}
                  className="absolute top-0 left-[50%] transform translate-x-[-50%]"
                />
              </a>
              <a
                href="#"
                className={`h-[60px] absolute bottom-0 w-[100%]
              transition-opacity duration-400 linear ${
                slideIsBig ? 'opacity-0' : 'opacity-100'
              }`}
              >
                <Image
                  src={slide.back}
                  alt="topbanner-background"
                  fill={true}
                />
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={960}
                  height={60}
                  className="absolute top-0 left-[50%] transform translate-x-[-50%]"
                />
              </a>
            </li>
          ))}
        </ul>
        <InnerPaging
          slides={slidesInfo}
          currentSlide={currentSlide}
          isWhite={currentSlideColor}
          isBig={slideIsBig}
          onChnageSlide={(slideKey) => setCurrentSlide(slideKey)}
        />
        {true && (
          <button
            onClick={() => setSlideIsBig(false)}
            className="absolute left-[50%] bottom-[50%] 
          z-[4] ml-[570px] mb-[-30px]"
          >
            <Image
              src={closeButtonX}
              alt="close-button"
              width={60}
              height={60}
            />
          </button>
        )}
      </div>
      <div className="h-[2000px] bg-cyan-500"></div>
    </div>
  )
}
