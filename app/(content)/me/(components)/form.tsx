'use client'
import { useRef, useState } from 'react'
import useUser from '@/lib/useUser'
import Image from 'next/image'
import TagInput from '@/components/tagInput'
import { TextareaAutosize } from '@mui/base/TextareaAutosize'

export default function SettingForm() {
  const { user, mutateUser } = useUser()
  const imgInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<Blob | null | string>()

  if (!user) return null
  console.log(user)
  return (
    <article className="font-noto_sans_light">
      <h2 className="screen-out">프로필 설정</h2>
      <div className="min-h-[120px] bg-[#f8f8f8] relative">
        <div className="w-[100px] h-[100px] absolute left-1/2 ml-[250px] bottom-[-50px] z-[5]">
          <Image
            src={user.avatar}
            alt={user.username}
            fill={true}
            className="object-cover rounded-full"
          />
          <label
            className="bg-ico-brunch-sub2 bg-[0px_-210px] bottom-0 h-[42px] absolute 
                      w-[42px] right-[-13px] inline-block"
          >
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              className={`hidden`}
              onChange={(e) => {
                setProfile(e.target.files![0])
              }}
            />
          </label>
        </div>
      </div>
      <div className="pb-[76px]">
        <form>
          <fieldset>
            <legend className="screen-out">프로필 편집 입력폼</legend>
            {/* 작가명 */}
            <div className="w-[700px] m-auto mb-[-4px] after:clear-both after:block after:content-['']">
              <div
                className="mt-[37px] pb-[13px] text-[#959595] text-[12px] leading-[15px] 
                          overflow-hidden"
              >
                <h3
                  className="text-[#333] float-left font-noto_sans_light text-[11px] 
                            leading-[14px] mr-[10px] py-[1px] font-semibold"
                >
                  <label>작가명</label>
                  <span
                    className="bg-ico-brunch-sub2 w-[6px] h-[6px] align-top inline-block 
                              bg-[-160px_-230px] m-[-1px_0px_0px_4px]"
                  />
                </h3>
              </div>
              <div className="pb-[6px] border-b border-[#eee] bg-white overflow-hidden">
                <TextareaAutosize
                  defaultValue={user.username}
                  maxLength={30}
                  disabled
                  className="resize-none h-[34px] text-[#959595] text-[28px] leading-[34px]
                            overflow-y-hidden pr-[160px] bg-transparent box-border block w-full outline-none"
                />
                <p
                  className="text-[#ff4040] mt-[6px] leading-[18px] clear-both text-[11px] 
                            font-medium font-noto_sans_thin"
                >
                  GitHub연동 계정으로 내부 정책상 가입후 30일간 작가명 변경이
                  불가능합니다.
                </p>
              </div>
            </div>
            {/* 태그 */}
            <div className="w-[700px] m-auto mb-[-4px] after:clear-both after:block after:content-['']">
              <div
                className="mt-[37px] pb-[13px] text-[#959595] text-[12px] leading-[15px] 
                          overflow-hidden"
              >
                <h3
                  className="text-[#333] float-left font-noto_sans_light text-[11px] 
                            leading-[14px] mr-[10px] py-[1px] font-semibold"
                >
                  <label>태그</label>
                </h3>
              </div>
              <div className="pb-[6px] border-b border-[#eee] bg-white overflow-hidden">
                <TagInput />
              </div>
            </div>
            {/* 소개 */}
            <div className="w-[700px] m-auto after:clear-both after:block after:content-['']">
              <div
                className="text-[#959595] text-[12px] leading-[15px] mt-[57px] 
                          overflow-hidden pb-[16px]"
              >
                <h3
                  className="text-[#333] float-left font-noto_sans_light text-[11px] 
                            leading-[14px] mr-[10px] py-[1px] font-semibold"
                >
                  <label>소개</label>
                  <span
                    className="bg-ico-brunch-sub2 w-[6px] h-[6px] align-top inline-block 
                              bg-[-160px_-230px] m-[-1px_0px_0px_4px]"
                  />
                </h3>
              </div>
              <div className="overflow-hidden bg-white border border-[#eee]">
                <TextareaAutosize
                  defaultValue={user.introduction}
                  minRows={2}
                  maxLength={100}
                  className={`overflow-y-hidden resize-none p-[15px_20px_13px] bg-transparent outline-none
                              box-border text-[#333] block text-[13px] leading-[24px] w-full align-middle`}
                />
              </div>
              <div className="pt-[17px]">
                <span
                  className="border border-[#00c6be] text-[#00c6be] rounded-[8px] float-left text-[10px] 
                            leading-[15px] m-[4px_6px_0px_0px] px-[4px] font-semibold"
                >
                  TIP
                </span>
                <p className="text-[#959595] text-[12px] leading-[20px] overflow-hidden">
                  {` 작가 소개에 포함되는 내용은 포털 검색 등을 통해 외부에 공개되는 정보이므로`}
                  <br />
                  {` 작성 시 불필요한 개인정보가 포함되지 않도록 주의가 필요합니다.`}
                </p>
              </div>
            </div>
            {/* 버튼 */}
            <div className="text-center mt-[30px] mb-[24px]">
              <button
                className="w-[80px] mx-[4px] border border-[#bbb] rounded-[20px] text-[#666] 
                        bg-white box-border inline-block text-[13px] h-[32px] leading-[32px] min-w-[80px]
                        text-center align-top"
              >
                취소하기
              </button>
              <button
                className="w-[80px] mx-[4px] border border-[#00c6be] rounded-[20px] text-[#00c6be] 
                        bg-white box-border inline-block text-[13px] h-[32px] leading-[32px] min-w-[80px]
                        text-center align-top"
              >
                저장하기
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </article>
  )
}
