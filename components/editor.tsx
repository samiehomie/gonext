'use client'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
// import { deleteUploadImage } from '@/actions'
import { HookCallback } from '@toast-ui/editor/types/editor'

export const toolbar = [
  [
    {
      name: 'image',
      style: { borderColor: 'transparent' },
      className: `inline-block w-[25px] h-[25px] bg-ico-btn-cover2 bg-[0px_0px] 
    absolute right-[-175px] top-[-8px] z-[10000] focus:outline-none`
    },
    {
      name: '구분선',
      command: 'hr',
      style: { borderColor: 'transparent' },
      className: `inline-block w-[25px] h-[25px] bg-ico-btn-cover2 bg-[0px_-249px] absolute 
    right-[-175px] top-[32px] z-[10000] focus:outline-none`
    }
  ]
]
function TuiEditor({
  content,
  editorRef,
  imageHandler,
  onWrite = true
}: {
  content?: string
  editorRef?: React.RefObject<Editor>
  imageHandler?: (blob: File | Blob, callback: HookCallback) => void
  onWrite?: boolean
}) {
  return (
    <Editor
      initialValue={content ?? ' '}
      initialEditType="wysiwyg"
      autofocus={false}
      ref={editorRef}
      toolbarItems={onWrite ? toolbar : undefined}
      placeholder="내용을 입력해주세요"
      hideModeSwitch
      height="100%"
      hooks={{ addImageBlobHook: imageHandler }}
    />
  )
}

export default TuiEditor
