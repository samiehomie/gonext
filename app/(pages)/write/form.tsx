'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { useRef } from 'react'
import { getDateString } from '@/lib/utils'
import { saveWriting } from '@/actions'
import LogOut from '@/components/logOut'

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold">Writing</h2>
      <div className="mt-8 max-w-md">
        <form
          className="grid grid-cols-1 gap-6"
          ref={formRef}
          action={async (formData) => {
            await saveWriting(formData)
            formRef.current?.reset()
          }}
        >
          <label className="hidden">
            <span className="text-gray-700">Created</span>
            <input
              type="hidden"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={getDateString()}
              name="created"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              disabled={pending}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              name="title"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Subtitle</span>
            <input
              type="text"
              disabled={pending}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              name="subtitle"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Tags</span>
            <input
              type="text"
              disabled={pending}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              name="tags"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Content</span>
            <textarea
              name="content"
              disabled={pending}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          "
              rows={5}
            ></textarea>
          </label>
          <button type="submit" disabled={pending}>
            submit
          </button>
        </form>
      </div>
      <LogOut>
        <button
          className="border border-[#bbb] rounded-[16px] text-[#959595] text-[13px] 
                    h-[32px] mx-[2px] w-[80px]"
        >
          로그아웃
        </button>
      </LogOut>
    </div>
  )
}
