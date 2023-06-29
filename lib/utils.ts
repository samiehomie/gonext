import qs from 'qs'

// https://strapi-pyj2.onrender.com/api/books?fields[0]=Title&populate[Cover][fields]=formats&filters[Title][$contains]=정
export function getSearchUrl(searchWord: string) {
  const queryWritings = qs.stringify(
    {
      fields: ['Title'],
      filters: { Title: { $contains: searchWord } },
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
    },
    {
      encodeValuesOnly: true,
    },
  )
  return {
    writingsUrl: `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?${queryWritings}`,
    booksUrl: `${process.env.NEXT_PUBLIC_DB_URL}/api/books?${queryBooks}`,
    authorsUrl: `${process.env.NEXT_PUBLIC_DB_URL}/api/authors?${queryAuthors}`,
  }
}
