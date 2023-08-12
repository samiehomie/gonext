import { useState } from 'react'
import { WithContext as ReactTags, Tag } from 'react-tag-input'

const KeyCodes = {
  comma: 188,
  enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

export default function TagInput() {
  const [tags, setTags] = useState([{ id: '1', text: 'Thailand' }])

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i))
  }

  const handleAddition = (tag: Tag) => {
    if (tags.length >= 6) return

    const newTag = { id: tag.id, text: tag.text.replace(/\s+/g, '') }
    setTags([...tags, newTag])
  }

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    setTags(newTags)
  }

  return (
    <div className="pt-[5px] min-h-[30px]">
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
