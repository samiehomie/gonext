import qs from 'qs'

export const queryWritings = qs.stringify(
  {
    fields: ['title', 'subtitle', 'content'],
    populate: {
      user: {
        fields: ['username'],
      },
      cover: {
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
    fields: ['title', 'publishedAt', 'introduction', 'summary', 'tags'],
    populate: {
      user: {
        fields: ['username', 'introduction', 'job'],
        populate: {
          profile: {
            fields: ['formats', 'url'],
          },
        },
      },
      writings: {
        fields: ['title', 'content', 'subtitle'],
        populate: {
          cover: {
            fields: ['formats', 'url'],
          },
          user: {
            fields: ['username'],
          },
        },
      },
      cover: {
        fields: ['formats', 'url'],
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const queryUser = qs.stringify(
  {
    fields: ['username', 'introduction', 'job', 'tags'],
    populate: {
      profile: {
        fields: ['formats', 'url'],
      },
      writings: {
        fields: ['title', 'content', 'subtitle', 'publishedAt'],
        populate: {
          cover: {
            fields: ['formats', 'url'],
          },
          book: {
            fields: ['title'],
          },
          user: {
            fields: ['username'],
          },
        },
      },
      books: {
        fields: ['title', 'publishedAt', 'introduction', 'summary', 'tags'],
        populate: {
          cover: {
            fields: ['formats', 'url'],
          },
          writings: {
            fields: ['title'],
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
  const url = `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?`
  const target = qs.stringify(
    {
      fields: ['username', 'introduction', 'job'],
      populate: {
        profile: {
          fields: 'url',
        },
        writings: {
          filters: {
            id: {
              $eq: writingId,
            },
          },
          fields: ['title', 'content', 'created', 'subtitle', 'tags'],
          populate: {
            cover: {
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
      fields: ['username', 'introduction', 'job'],
      populate: {
        profile: {
          fields: 'url',
        },
        writings: {
          filters: {
            id: {
              $ne: writingId,
            },
          },
          fields: ['title', 'content', 'created', 'subtitle', 'tags'],
          populate: {
            cover: {
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

export const queryUsersFive = qs.stringify(
  {
    fields: ['username', 'introduction'],
    populate: {
      profile: { fields: ['url'] },
    },
    start: 0,
    limit: 5,
  },
  {
    encodeValuesOnly: true,
  },
)

export const urlBook = `${process.env.NEXT_PUBLIC_DB_URL}/api/books/1?`
export const urlWritings = `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?`
