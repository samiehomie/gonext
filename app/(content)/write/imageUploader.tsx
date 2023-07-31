'use client'
import { useState } from 'react'
import { UploadDropzone, UploadButton } from 'react-uploader'
import { Uploader } from 'uploader'
import useSWR from 'swr'
import useUser from '@/lib/useUser'


const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : 'free'
})

export default function ImageUploader() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null)
  const [restoredImage, setRestoredImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false)
  const [sideBySide, setSideBySide] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [photoName, setPhotoName] = useState<string | null>(null)

  // TODO: Implement api
  const { data, mutate } = useSWR('/api/remaining')
  const { user } = useUser()

  const options = {
    maxFileCount: 1,
    mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    editor: { images: { crop: false } },
    styles: { colors: { primary: '#000' } },
    // onValidate: async (file: File): Promise<undefined | string> => {
    //   if (data.remainingGenerations === 0) {
    //     return 'No more generations left for the day.'
    //   }
    //   return undefined
    // }
  }

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName)
          setOriginalPhoto(file[0].fileUrl.replace('raw', 'thumbnail'))
          generatePhoto(file[0].fileUrl.replace('raw', 'thumbnail'))
        }
      }}
      width="670px"
      height="250px"
    />
  )

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(true)

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl: fileUrl })
    })

    let newPhoto = await res.json()
    if (res.status !== 200) {
      setError(newPhoto)
    } else {
      mutate()
      setRestoredImage(newPhoto)
    }
    setLoading(false)
  }
  return (
<div></div>
  )
}

