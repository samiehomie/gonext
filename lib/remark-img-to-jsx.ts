import { URL } from 'url'
import https from 'https'
import sizeOf from 'image-size'


async function getImgSize(imgUrl: string, dimensions: any) {
  const options = new URL(imgUrl)
  await new Promise((resolve) => {
    https.get(options, (res) => {
      const chunks: any[] = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve((dimensions = sizeOf(buffer)))
      })
    })
  })
}