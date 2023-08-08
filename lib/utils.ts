import qs from 'qs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { comments } from '@/types'
import { subscription, subscribers } from '@/types'
import exp from 'constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCommentsQuery(comments: comments) {
  const filters = {
    id: {
      $in: comments.map((comment) => comment.author.id)
    }
  }
  const populate = {
    profile: true
  }
  const fields = ['username']
  return qs.stringify({
    filters,
    populate,
    fields
  })
}

export function getWritingsQuery(pageSize: number, page: number = 1) {
  return qs.stringify(
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
        page,
        pageSize
      }
    },
    {
      encodeValuesOnly: true
    }
  )
}

export function getSearchQuery(searchWord: string) {
  const queryWritings = qs.stringify(
    {
      fields: ['title'],
      filters: { title: { $contains: searchWord } },
      populate: {
        user: {
          fields: ['username']
        }
      },
      pagination: {
        page: 1,
        pageSize: 7
      }
    },
    {
      encodeValuesOnly: true
    }
  )
  const queryBooks = qs.stringify(
    {
      fields: ['title'],
      populate: {
        cover: {
          fields: ['formats']
        }
      },
      filters: { title: { $contains: searchWord } },
      pagination: {
        page: 1,
        pageSize: 3
      }
    },

    {
      encodeValuesOnly: true
    }
  )
  const queryUsers = qs.stringify(
    {
      fields: ['username'],
      populate: {
        profile: {
          fields: ['formats']
        }
      },
      filters: { username: { $contains: searchWord } },
      start: 0,
      limit: 3
    },
    {
      encodeValuesOnly: true
    }
  )
  return {
    queryWritings,
    queryBooks,
    queryUsers
  }
}

export const regexInvalidQuery = /\[\$contains\]=$/

export function dressUpMarkdown(str: string) {
  const regexImg = /!\[(.*?)\]\((.*?)\)/g
  const content = str
    .replace(regexImg, '')
    .replace(/\*{3}/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
  return content
}

export function getEnglishDate(dateString: string) {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
  return formattedDate
}

export function getDateString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function checkType(
  data: subscribers | subscription
): data is subscribers {
  return Array.isArray(data.data)
}

export function confirmSubscription(
  subscription: subscription | subscribers,
  followerId: number
) {
  const followings = checkType(subscription)
    ? subscription.data
    : subscription?.data.attributes.targets.data
  if (!followings) return false
  return followings.findIndex((el) => el.id === followerId) !== -1
}
