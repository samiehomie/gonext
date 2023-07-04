import qs from 'qs'

export const queryWritings = qs.stringify(
  {
    fields: ['Title', 'Subtitle', 'Content'],
    populate: {
      author: {
        fields: ['Name'],
      },
      Cover: {
        fields: ['formats'],
      },
    },
    pagination: {
      pageSize: 29,
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const queryBook = qs.stringify(
  {
    fields: ['Title', 'publishedAt'],
    populate: {
      author: {
        fields: ['name'],
      },
      Cover: {
        fields: ['formats'],
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const urlBook = `${process.env.NEXT_PUBLIC_DB_URL}/api/books/1?`
export const urlWritings = `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?`
