const keywords = [
  '지구한바퀴<br />세계여행',
  '그림·웹툰',
  '시사·이슈|new|',
  'IT 트렌드',
  '사진·촬영',
  '취향저격<br />영화 리뷰',
  '오늘은<br />이런 책|new|',
  '뮤직 인사이드',
  '글쓰기<br />코치',
  '직장인<br />현실 조언',
  '스타트업<br />경험담|new|',
  '육아<br />이야기',
  '요리·레시피',
  '건강·운동',
  '멘탈 관리<br />심리 탐구',
  '디자인<br />스토리',
  '문화·예술',
  '건축·설계',
  '인문학·철학',
  '쉽게 읽는<br />역사',
  '우리집<br />반려동물',
  '멋진<br />캘리그래피',
  '사랑·이별',
  '감성<br />에세이|new|',
]

const regexNew = /\|new\|$/

function NewIcon() {
  return (
    <span
      className="bg-ico-weekly bg-[-77px_-80px] block 
                h-[16px] w-[16px] absolute top-[12px] right-[12px]"
    ></span>
  )
}

export default function Keywords() {
  return (
    <div>
      <h3
        className="mt-[152px] mx-auto h-[13px] w-[266px] 
                  bg-brunch-text bg-[-101px_-300px] 
                  overflow-hidden indent-[-9999px]"
      >
        BRUNCH KEYWORD
      </h3>
      <p className="w-[960px] m-auto">
        <span
          className="overflow-hidden indent-[-9999px] 
                        block bg-brunch-text bg-[-175px_0px] h-[11px] w-[149px]
                        mt-[17px] mx-auto"
        >
          키워드로 분류된 다양한 글 모음
        </span>
      </p>
      <div className="overflow-x-auto w-full font-noto_sans_light">
        <div className="h-[363px] w-[960px] relative mt-[46px] mx-auto">
          {keywords.map((keyword, index) => (
            <a
              key={index}
              href="#"
              className={`group border border-[#eee] text-[14px] text-center
                        absolute h-[119px] w-[119px] leading-[18px] z-[1] text-[#959595]
                        hover:border-[#00c6be] hover:text-[#00c6be] hover:z-[2]`}
              style={{
                top: `${120 * Math.floor(index / 8)}px`,
                left: `${120 * (index % 8)}px`,
              }}
            >
              {regexNew.test(keyword) ? (
                <>
                  <span
                    className="block relative top-[50%] translate-y-[-50%]"
                    dangerouslySetInnerHTML={{
                      __html: keyword.replace(regexNew, ''),
                    }}
                  ></span>
                  <NewIcon />
                </>
              ) : (
                <span
                  className="block relative top-[50%] translate-y-[-50%]"
                  dangerouslySetInnerHTML={{ __html: keyword }}
                ></span>
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="clear-both"></div>
    </div>
  )
}
