import qs from 'qs'

export function getWritingsQuery(pageSize: number, page: number = 1) {
  return qs.stringify(
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
        page,
        pageSize,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
}

export function getSearchQuery(searchWord: string) {
  const queryWritings = qs.stringify(
    {
      fields: ['Title'],
      filters: { Title: { $contains: searchWord } },
      pagination: {
        page: 1,
        pageSize: 7,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  const queryBooks = qs.stringify(
    {
      fields: ['Title'],
      populate: {
        Cover: {
          fields: ['formats'],
        },
      },
      filters: { Title: { $contains: searchWord } },
      pagination: {
        page: 1,
        pageSize: 3,
      },
    },

    {
      encodeValuesOnly: true,
    },
  )
  const queryAuthors = qs.stringify(
    {
      fields: ['Name'],
      populate: {
        Profile: {
          fields: ['formats'],
        },
      },
      filters: { Name: { $contains: searchWord } },
      pagination: {
        page: 1,
        pageSize: 3,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  return {
    queryWritings,
    queryBooks,
    queryAuthors,
  }
}

export const regexInvalidQuery = /\[\$contains\]=$/

export function removeMarkdownImages(str: string) {
  const regex = /!\[(.*?)\]\((.*?)\)/g
  return str.replace(regex, '')
}
