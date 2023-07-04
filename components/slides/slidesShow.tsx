'use client'
import { useRef, useState, useEffect } from 'react'
import Slides from './slides'

function Pagination({
  pageNumber,
  i,
  onSlide,
}: {
  pageNumber: number
  i: number
  onSlide: (plus: number, pagination?: boolean) => void
}) {
  return (
    <span
      className={`inline-block h-[31px] align-top px-[11px] ${
        i !== pageNumber && 'cursor-pointer'
      }`}
      onClick={() => onSlide(i, true)}
    >
      {i === pageNumber && <span className="screen-out">현재페이지</span>}
      {i === pageNumber ? (
        <span
          className={`block bg-img-paging overflow-hidden
                        h-[12px] mt-[8px] w-[13px] indent-[-9999px]`}
          style={{ backgroundPosition: `${i * -20}px -10px` }}
        >
          {`0${i + 1}`}
        </span>
      ) : (
        <span
          className={`block bg-img-paging overflow-hidden
                        h-[9px] mt-[10px] w-[13px] indent-[-9999px] `}
          style={{ backgroundPosition: `${i * -20}px 0px` }}
        >
          {`0${i + 1}`}
        </span>
      )}
    </span>
  )
}

let lastPage = 0

export default function SlidesShow() {
  const [page, setPage] = useState(0)
  const slidesRef = useRef<HTMLUListElement>(null)
  const endNumber = 8
  const onSlide = (plus: number, pagination = false) => {
    const nextPage = pagination ? plus : page + plus
    if (nextPage < 0 || nextPage > endNumber) {
      return
    }
    setPage(nextPage)
    lastPage = nextPage
    if (slidesRef.current !== null) {
      slidesRef.current.style.transform = `translateX(-${nextPage * 960}px)`
    }
  }

  useEffect(() => {
    if (slidesRef.current !== null) {
      setPage(lastPage)
      slidesRef.current.style.transform = `translateX(-${lastPage * 960}px)`
    }
  }, [])

  return (
    <div className="relative mt-[22px]">
      <h3 className="screen-out">EDITOR PIC</h3>
      <div className="h-[520px] overflow-visible w-[960px] m-auto relative">
        <ul
          ref={slidesRef}
          className="absolute top-0 w-[900%] translate-x-0 
        transition-transform duration-300 ease-in-out"
        >
          <Slides />
        </ul>
      </div>
      {/* wrap_button */}
      <div>
        <button
          className={`mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] left-[30px] ${page <= 0 && 'hidden'}`}
          onClick={() => onSlide(-1)}
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-167px_-175px] ico-brunch
          "
          >
            이전 에디터픽 보기
          </span>
        </button>
        <button
          className={`mt-[-77px] h-[100px] absolute 
          top-[50%] w-[100px] z-[10] right-[30px] ${
            page >= endNumber && 'hidden'
          }`}
          onClick={() => onSlide(1)}
        >
          <span
            className="h-[101px] w-[100px] bg-ico-brunch-main
            float-left bg-[-269px_-175px] ico-brunch
          "
          >
            다음 에디터픽 보기
          </span>
        </button>
      </div>
      {/* wrap_paging */}
      <div className="w-[960px] text-center m-[22px_auto_0px_auto]">
        {[...Array(9)].map((_, i) => (
          <Pagination key={i} pageNumber={page} i={i} onSlide={onSlide} />
        ))}
      </div>
    </div>
  )
}
