import qs from 'qs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWritingsQuery(pageSize: number, page: number = 1) {
  return qs.stringify(
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
      fields: ['title'],
      filters: { title: { $contains: searchWord } },
      populate: {
        user: {
          fields: ['username'],
        },
      },
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
      fields: ['title'],
      populate: {
        cover: {
          fields: ['formats'],
        },
      },
      filters: { title: { $contains: searchWord } },
      pagination: {
        page: 1,
        pageSize: 3,
      },
    },

    {
      encodeValuesOnly: true,
    },
  )
  const queryUsers = qs.stringify(
    {
      fields: ['username'],
      populate: {
        profile: {
          fields: ['formats'],
        },
      },
      filters: { username: { $contains: searchWord } },
      start: 0,
      limit: 3,
    },
    {
      encodeValuesOnly: true,
    },
  )
  return {
    queryWritings,
    queryBooks,
    queryUsers,
  }
}

export const regexInvalidQuery = /\[\$contains\]=$/

export function removeMarkdownImages(str: string) {
  const regex = /!\[(.*?)\]\((.*?)\)/g
  return str.replace(regex, '')
}

export function getEnglishDate(dateString: string) {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  return formattedDate
}
