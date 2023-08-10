import qs from 'qs'

export const getUsersFilteredQuery = (tag: string) => {
  const queryTags = qs.stringify(
    {
      fields: ['username', 'introduction', 'job', 'tags'],
      populate: {
        profile: {
          fields: ['url', 'formats']
        },
        writings: {
          fields: ['title']
        }
      },
      filters: {
        tags: { $contains: tag }
      },
      start: 0,
      limit: 6
    },
    {
      encodeValuesOnly: true
    }
  )
  return queryTags
}

export const queryTopBanners = qs.stringify(
  {
    filters: {
      username: {
        $eq: 'brunchstory'
      }
    },
    populate: {
      writings: {
        filters: {
          tags: {
            $contains: '프로모션'
          }
        }
      }
    }
  },
  {
    encodeValuesOnly: true
  }
)
export const queryTopNotice = qs.stringify(
  {
    filters: {
      username: {
        $eq: 'brunchstory'
      }
    },
    populate: {
      writings: {
        filters: {
          tags: {
            $contains: '공지사항'
          }
        }
      }
    }
  },
  {
    encodeValuesOnly: true
  }
)
export const queryWritings = qs.stringify(
  {
    fields: ['title', 'subtitle', 'content'],
    populate: {
      user: {
        fields: ['username']
      },
      cover: {
        fields: ['formats']
      }
    },
    pagination: {
      pageSize: 29
    }
  },
  {
    encodeValuesOnly: true
  }
)

export const queryBook = qs.stringify(
  {
    fields: ['title', 'publishedAt', 'introduction', 'summary', 'tags'],
    populate: {
      user: {
        fields: ['username', 'introduction', 'job'],
        populate: {
          profile: {
            fields: ['formats', 'url']
          }
        }
      },
      writings: {
        fields: ['title', 'content', 'subtitle'],
        populate: {
          cover: {
            fields: ['formats', 'url']
          },
          user: {
            fields: ['username']
          }
        }
      },
      cover: {
        fields: ['formats', 'url']
      }
    }
  },
  {
    encodeValuesOnly: true
  }
)

export function getQueryWritingPage(userId: string, writingId: string) {
  const url = `${process.env.NEXT_PUBLIC_DB_URL}/api/users/${userId}?`
  const target = qs.stringify(
    {
      fields: ['username', 'introduction', 'job'],
      populate: {
        profile: {
          fields: 'url'
        },
        writings: {
          filters: {
            id: {
              $eq: writingId
            }
          },
          fields: ['title', 'content', 'created', 'subtitle', 'tags'],
          populate: {
            cover: {
              fields: 'url'
            }
          }
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  )
  const others = qs.stringify(
    {
      fields: ['username', 'introduction', 'job'],
      populate: {
        profile: {
          fields: 'url'
        },
        writings: {
          filters: {
            id: {
              $ne: writingId
            }
          },
          fields: ['title', 'content', 'created', 'subtitle', 'tags'],
          populate: {
            cover: {
              fields: 'url'
            }
          }
        }
      },
      pagination: {
        pageSize: 6
      }
    },
    {
      encodeValuesOnly: true
    }
  )
  return [url + target, url + others]
}

export const queryUsersFive = qs.stringify(
  {
    fields: ['username', 'introduction'],
    populate: {
      profile: { fields: ['url'] }
    },
    start: 0,
    limit: 5
  },
  {
    encodeValuesOnly: true
  }
)

export const urlBook = `${process.env.NEXT_PUBLIC_DB_URL}/api/books/1?`
export const urlWritings = `${process.env.NEXT_PUBLIC_DB_URL}/api/writings?`

export const queryUnpublished =
  '?populate[writings][populate][cover]=true&populate[writings][filters][publishedAt][$null]=true&populate[writings][filters][$or][0][tags][$notContains]=_delete&populate[writings][filters][$or][1][tags][$null]=true'

export const queryPendingDelete =
  '?populate[writings][populate][cover]=true&populate[writings][filters][publishedAt][$null]=true&populate[writings][filters][tags][$contains]=_delete'

export const queryUser = `?populate[profile]=true&populate[writings][populate][0]=book&populate[writings][populate][1]
  =cover&populate[writings][populate][2]=user&populate[books][populate][0]=cover&populate[books][populate][1]
  =writings&populate[subscription][populate][targets][populate][profile]=true`

export const getQuerySubscribers = (userId: string | number) =>
  `?filters[targets][id][$eq]=${userId}&populate[subscriber][populate][profile]=true`

export const queryWritingsFilteredTag = `/api/writings?populate[cover]=true&populate[user]=true&filters[tags][$contains]=`
