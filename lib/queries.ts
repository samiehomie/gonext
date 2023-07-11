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
    fields: ['Title', 'publishedAt', 'Introduction', 'Summary', 'Tags'],
    populate: {
      author: {
        fields: ['name', 'Introduction', 'Job'],
        populate: {
          Profile: {
            fields: ['formats', 'url'],
          },
        },
      },
      writings: {
        fields: ['Title', 'Content', 'Subtitle'],
        populate: {
          Cover: {
            fields: ['formats', 'url'],
          },
          author: {
            fields: ['Name'],
          },
        },
      },
      Cover: {
        fields: ['formats', 'url'],
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const queryAuthor = qs.stringify(
  {
    fields: ['Name', 'Introduction', 'Job', 'Tags'],
    populate: {
      Profile: {
        fields: ['formats', 'url'],
      },
      writings: {
        fields: ['Title', 'Content', 'Subtitle', 'publishedAt'],
        populate: {
          Cover: {
            fields: ['formats', 'url'],
          },
          book: {
            fields: ['Title'],
          },
        },
      },
      books: {
        fields: ['Title'],
        populate: {
          Cover: {
            fields: ['formats', 'url'],
          },
          writings: {
            fields: ['Title'],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export function getQueryWritingPage(userId: string, writingId: string) {
  const url = `${process.env.NEXT_PUBLIC_DB_URL}/api/authors/${userId}?`
  const target = qs.stringify(
    {
      fields: ['Name', 'Introduction', 'Job'],
      populate: {
        Profile: {
          fields: 'url',
        },
        writings: {
          filters: {
            id: {
              $eq: writingId,
            },
          },
          fields: ['Title', 'Content', 'Created', 'Subtitle', 'Tags'],
          populate: {
            Cover: {
              fields: 'url',
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  const others = qs.stringify(
    {
      fields: ['Name', 'Introduction', 'Job'],
      populate: {
        Profile: {
          fields: 'url',
        },
        writings: {
          filters: {
            id: {
              $ne: writingId,
            },
          },
          fields: ['Title', 'Content', 'Created', 'Subtitle', 'Tags'],
          populate: {
            Cover: {
              fields: 'url',
            },
          },
        },
      },
      pagination: {
        pageSize: 6,
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  return [url + target, url + others]
}

export const urlBook = `${process.env.NEXT_PUBLIC_DB_URL}/api/books/1?`
export const urlWritings = `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?`
