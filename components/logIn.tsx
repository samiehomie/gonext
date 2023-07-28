'use client'
import GitHubIco from '@/components/gitHubico'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useUser from '@/lib/useUser'
import fetchJson from '@/lib/fetchJson'
import { debounce } from 'lodash'

export default function Login() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const seal = searchParams!.get('seal')
  const { mutateUser } = useUser({
    redirectTo: pathname!,
    redirectIfFound: true
  })
  const router = useRouter()
  const handlerClick = debounce(() => {
    router.push(`/api/auth/github/ask?back=${pathname}`)
  }, 500)

  useEffect(() => {
    const handler = async () => {
      if (seal) {
        mutateUser(
          await fetchJson(`/api/auth/github/login?seal=${seal}`),
          false
        )
      }
    }
    handler()
  }, [seal, mutateUser])

  return (
    <button
      onClick={handlerClick}
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
    </button>
  )
}
