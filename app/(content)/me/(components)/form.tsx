'use client'
import useUser from '@/lib/useUser'
import Image from 'next/image'

export default function SettingForm() {
  const { user, mutateUser } = useUser()

  if (!user) return null

  return (
    <article>
      <h2 className="screen-out">프로필 설정</h2>
      <div className="min-h-[120px] bg-[#f8f8f8] relative">
        <div className="w-[100px] h-[100px] absolute left-1/2 ml-[250px] bottom-[-50px] z-[5]">
          <Image
            src={user.avatar}
            alt={user.username}
            fill={true}
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className="h-[1000px]"></div>
    </article>
  )
}
