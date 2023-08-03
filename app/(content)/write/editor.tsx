'use client'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { deleteUploadImage } from '@/actions'
import { HookCallback } from '@toast-ui/editor/types/editor'
import sanitizeHtml from 'sanitize-html'

const toolbar = [
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
  imageHandler
}: {
  content?: string
  editorRef?: React.RefObject<Editor>
  imageHandler?: (blob: File | Blob, callback: HookCallback) => void
}) {
  return (
    <>
      <Editor
        initialValue={content ?? ' '}
        initialEditType="wysiwyg"
        autofocus={false}
        ref={editorRef}
        toolbarItems={toolbar}
        hideModeSwitch
        height="100%"
        hooks={{ addImageBlobHook: imageHandler }}
        // customHTMLSanitizer={(str) =>
        //   sanitizeHtml(str, {
        //     transformTags: {
        //       br: '\n'
        //     }
        //   })
        // }
      />
    </>
  )
}

export default TuiEditor
