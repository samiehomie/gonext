import { Suspense } from 'react'
import RecommendArticle from '../index/recommendArticle'

export default function RecommendContainer() {
  return (
    <div className="relative">
      <h3
        className="bg-brunch-text bg-[0px_-225px] h-[13px] w-[380px] 
              mt-[150px] mx-auto overflow-hidden indent-[-9999px]"
      >
        RECOMMENDED ARTICLES
      </h3>
      <p className="w-[960px] m-auto">
        <span
          className="block overflow-hidden indent-[-9999px] w-[162px]
                bg-brunch-text bg-[0px_-75px] h-[11px] mb-[47px] mt-[17px] 
                mx-auto"
        >
          갓 구워낸 따끈따끈한 추천글을 만나보세요
        </span>
      </p>
      <Suspense
        fallback={<div className="w-[960px] h-[781px] bg-white m-auto" />}
      >
        <RecommendArticle />
      </Suspense>
    </div>
  )
}
