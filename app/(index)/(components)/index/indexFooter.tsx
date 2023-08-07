const menuItems = [
  [
    '브런치스토리 이용안내',
    '이용약관',
    '작가신청',
    '이전 이용약관',
    '작가 지원 프로젝트',
    '카카오 개인정보 처리방침',
    '제휴제안',
    '청소년 보호정책',
    '고객센터',
    '운영정책',
  ],
  [
    '브런치스토리팀 공지사항',
    '공식 카카오톡 채널',
    '공식 인스타그램',
    '공식 페이스북',
  ],
]

export default function IndexFooter() {
  return (
    <footer className="index-footer bg-[#101010] h-[353px]">
      <div className="pt-[48px] m-auto relative w-[960px] text-[14px] font-noto_sans_demlight">
        <div className="mb-[35px] after:content-[''] after:clear-both after:block">
          <div
            className="float-left mt-[2px] mr-[198px] text-[#fff] 
                      italic font-[Georgia] text-center overflow-hidden"
          >
            <span
              className="bg-ico-brunch-main bg-[-130px_-230px] 
                        block h-[32px] w-[32px] mb-[22px]"
            ></span>
            <p
              className="overflow-hidden indent-[-9999px] inline-block 
                        bg-brunch-text bg-[0px_-600px] h-[33px] w-[118px]"
            >
              The Story of Future Writers
            </p>
          </div>
          <ul className="w-[464px] float-left m-auto">
            {menuItems[0].map((item, i) => (
              <li
                key={i}
                className="float-left leading-[17px] w-[232px] mb-[17px]"
              >
                <a
                  href="#"
                  className="text-[#d9d9d9] text-[12px] tracking-[-.03em]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <ul className="float-right m-auto">
            {menuItems[1].map((item, i) => (
              <li key={i} className="leading-[15px] mb-[17px]">
                <a
                  href="#"
                  className="text-[#d9d9d9] text-[12px] tracking-[-.03em]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="border-t border-[hsla(0,0%,100%,.1)] pt-[23px] 
                    after:content-[''] after:clear-both after:block"
        >
          <small className="mt-[2px] ml-[-1px] float-left">
            <a
              href="#"
              className="text-[11px] text-[#fff] font-[Georgia] italic opacity-50"
            >
              @ Sam
            </a>
          </small>
        </div>
      </div>
    </footer>
  )
}
