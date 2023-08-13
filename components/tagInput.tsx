import { MutableRefObject, useState } from 'react'
import { WithContext as ReactTags, Tag } from 'react-tag-input'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

function strToObj(tag: string, index: number) {
  return { id: `${index}`, text: tag }
}

function objArraytoStrArray(array: Tag[]) {
  return array.map(({ text }) => text)
}

export default function TagInput({
  initialTags,
  tagsRef,
  isLoading
}: {
  initialTags: string[] | null
  tagsRef: MutableRefObject<string[] | undefined | null>
  isLoading: boolean
}) {
  console.log('----------------------------->', initialTags, typeof initialTags)
  const oldTags = initialTags
    ? initialTags.map((tag, i) => strToObj(tag, i))
    : []
  const [tags, setTags] = useState(oldTags)
  tagsRef.current = objArraytoStrArray(tags)

  const handleDelete = (i: number) => {
    const newTags = tags.filter((_, index) => index !== i)
    setTags(newTags)
    //tagsRef.current = objArraytoStrArray(newTags)
  }

  const handleAddition = (tag: Tag) => {
    if (tags.length >= 6) return

    const newTag = { id: tag.id, text: tag.text.replace(/\s+/g, '') }
    const newTags = [...tags, newTag]
    setTags(newTags)
    //tagsRef.current = objArraytoStrArray(newTags)
  }

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    setTags(newTags)
    //tagsRef.current = objArraytoStrArray(newTags)
  }

  return (
    <div
      id="tags"
      className={`pt-[5px] min-h-[30px] ${isLoading && 'pointer-events-none'}`}
    >
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        placeholder="태그를 입력해주세요"
        maxLength={6}
        inputFieldPosition="inline"
      />
    </div>
  )
}
