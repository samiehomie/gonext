'use client'
import fetchJson, { FetchError } from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import GitHubIco from '@/components/gitHubico'
import Link from 'next/link'

export default function Login() {
  // 이미 로그인된 상태인지 확인하고
  // 로그인 유무 상관없이 리다이렉트 하지 않는다.
  const { mutateUser } = useUser()

  return (
    <Link
      prefetch={false}
      href={process.env.NEXT_PUBLIC_AUTH_GITHUB!}
      className="bg-[#231F20] box-border rounded-[5px] text-[#333] block text-[16px] 
                h-[60px] leading-[61px] mt-[14px] text-center w-full"
    >
      <GitHubIco
        width={18}
        height={18}
        extraClass="inline-block relative top-[1px] left-[-5px] align-middle text-center"
      />
      <span
        className="inline-block relative top-[1px] right-[-2.5px] text-[#f8f8f8] 
                text-[16px] leading-[61px] text-center"
      >
        GitHub 계정으로 로그인
      </span>
    </Link>
  )
}
