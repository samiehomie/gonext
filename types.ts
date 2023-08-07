export type resCreateWriting = {
  data: {
    id: number
    attributes: {
      title: string
      content: string
      created: string
      subtitle?: string
      tags?: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
    }
  }
  meta: {}
}

export type comment = {
  id: number
  content: string
  blocked: boolean
  blockedThread: boolean
  blockReason?: boolean
  isAdminComment?: boolean
  removed?: boolean
  approvalStatus?: boolean
  createdAt: string
  updatedAt: string
  gotThread: boolean
  author: {
    id: number
    name: string
    email: string
  }
  children: []
}

export type strapiUserResponse = {
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: true
    blocked: false
    job: string
    tags: null | string[]
    introduction: string
    createdAt: string
    updatedAt: string
    profile?: {
      id: number
      name: string
      alternativeText?: string
      caption?: number
      width: number
      height: number
      formats: {
        [key in imageSizes]: {
          name: string
          hash: string
          ext: string
          mime: string
          path: null | string
          width: number
          height: number
          size: number
          url: string
          provider_metadata: {
            public_id: string
            resource_type: string
          }
        }
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata: {
        public_id: string
        resource_type: string
      }
      createdAt: string
      updatedAt: string
    }
    subscription: subscriptionInUser
  }
  jwt: string
}

export type subscriptionInUser = null | {
  id: number
  createdAt: string
  updatedAt: string
  targets: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: true
    blocked: boolean
    createdAt: string
    updatedAt: string
    job: string
    tags: null | string[]
    introduction: null | string
  }[]
}

export type subscription = {
  data: {
    id: number
    attributes: {
      createdAt: string
      updatedAt: string
      targets: {
        data: {
          id: number
          attributes: {
            username: string
            email: string
            provider: string
            confirmed: boolean
            blocked: boolean
            job: string
            tags: null | string[]
            introduction: string
            createdAt: string
            updatedAt: string
            profile?: {
              data: {
                id: number
                attributes: {
                  name: string
                  alternativeText: null | string
                  caption: null | string
                  width: number
                  height: number
                  formats: {
                    [key in imageSizes]: {
                      name: string
                      hash: string
                      ext: string
                      mime: string
                      path: null | string
                      width: number
                      height: number
                      size: number
                      url: string
                      provider_metadata: {
                        public_id: string
                        resource_type: string
                      }
                    }
                  }
                  hash: string
                  ext: string
                  mime: string
                  size: number
                  url: string
                  previewUrl: null | string
                  provider: string
                  provider_metadata: {
                    public_id: string
                    resource_type: string
                  }
                  createdAt: string
                  updatedAt: string
                }
              }
            }
          }
        }[]
      }
    }
  }
  meta: {}
}

export type subscribers = {
  data: {
    id: number
    attributes: {
      createdAt: string
      updatedAt: string
      subscriber: userAsChild
    }
  }[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type commentWithUser = comment & { user: user }
export type commentsWithUser = commentWithUser[]

export type comments = comment[]
export type imageSizes = 'thumbnail' | 'small' | 'medium' | 'large'

import type { IronSessionData } from 'iron-session'
export type userSession = IronSessionData['user']
export type jwtSession = { id: number; iat: number; exp: number }
export type userAsChild = {
  data: {
    id: number
    attributes: {
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      job: string
      tags?: string[]
      introduction?: string
      createdAt: string
      updatedAt: string
      profile?: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: null | string
            caption: null | string
            width: number
            height: number
            formats: {
              [key in imageSizes]: {
                name: string
                hash: string
                ext: string
                mime: string
                path: null | string
                width: number
                height: number
                size: number
                url: string
                provider_metadata: {
                  public_id: string
                  resource_type: string
                }
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: null | string
            provider: string
            provider_metadata: {
              public_id: string
              resource_type: string
            }
            createdAt: string
            updatedAt: string
          }
        }
      }
      books?: books
      writings?: writings
    }
  }
}

export type writingInUser = {
  id: number
  title: string
  content: string
  created: string
  subtitle: string
  tags: null | string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  book?: bookInUser
  user: user
  cover?: {
    id: number
    name: string
    alternativeText: null | string
    caption: null | string
    width: number
    height: number
    formats: {
      [key in imageSizes]: {
        name: string
        hash: string
        ext: string
        mime: string
        path: null | string
        width: number
        height: number
        size: number
        url: string
        provider_metadata: {
          public_id: string
          resource_type: string
        }
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null | string
    provider: string
    provider_metadata: {
      public_id: string
      resource_type: string
    }
    createdAt: string
    updatedAt: string
  }
}

export type writingsInUser = writingInUser[]

export type bookInUser = {
  id: number
  title: string
  introduction: string
  summary: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  writings: writingsInUser
  cover: {
    id: number
    name: string
    alternativeText: null | string
    caption: null | string
    width: number
    height: number
    formats: {
      [key in imageSizes]: {
        name: string
        hash: string
        ext: string
        mime: string
        path: null | string
        width: number
        height: number
        size: number
        url: string
        provider_metadata: {
          public_id: string
          resource_type: string
        }
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null | string
    provider: string
    provider_metadata: {
      public_id: string
      resource_type: string
    }
    createdAt: string
    updatedAt: string
  }
}

export type booksInUser = bookInUser[]

export type user = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: true
  blocked: false
  job: string
  tags?: string[]
  introduction?: string
  createdAt: string
  updatedAt: string
  profile?: {
    id: number
    name: string
    alternativeText: null | string
    caption: null | string
    width: number
    height: number
    formats: {
      [key in imageSizes]: {
        name: string
        hash: string
        ext: string
        mime: string
        path: null | string
        width: number
        height: number
        size: number
        url: string
        provider_metadata: {
          public_id: string
          resource_type: string
        }
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null | string
    provider: string
    provider_metadata: {
      public_id: string
      resource_type: string
    }
    createdAt: string
    updatedAt: string
  }
  writings?: writingsInUser
  books?: booksInUser
  subscription: subscriptionInUser
}

export type users = user[]

export type author = {
  data: {
    id: number
    attributes: {
      name: string
      introduction: string
      email: string
      job: string
      tags: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
      writings?: writings
      books?: books
      profile?: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: null | string
            caption: null | string
            width: number
            height: number
            formats: {
              [key in imageSizes]: {
                name: string
                hash: string
                ext: string
                mime: string
                path: null | string
                width: number
                height: number
                size: number
                url: string
                provider_metadata: {
                  public_id: string
                  resource_type: string
                }
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: null | string
            provider: string
            provider_metadata: {
              public_id: string
              resource_type: string
            }
            createdAt: string
            updatedAt: string
          }
        }
      }
    }
  }
  meta: {}
}

export type writing = {
  data: {
    id: number
    attributes: {
      title: string
      content: string
      created: string
      subtitle?: string
      tags?: string[]
      createdAt: string
      updatedAt: string
      publishedAt?: string
      user?: userAsChild
      book?: book
      cover?: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: null | string
            caption: null | string
            width: number
            height: number
            formats: {
              [key in imageSizes]: {
                name: string
                hash: string
                ext: string
                mime: string
                path: null | string
                width: number
                height: number
                size: number
                url: string
                provider_metadata: {
                  public_id: string
                  resource_type: string
                }
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: null | string
            provider: string
            provider_metadata: {
              public_id: string
              resource_type: string
            }
            createdAt: string
            updatedAt: string
          }
        }
      }
    }
  }
  meta: {}
}

export type book = {
  data: {
    id: number
    attributes: {
      title: string
      introduction: string
      summary: string[]
      tags?: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
      user?: userAsChild
      writings?: writings
      cover?: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: null | string
            caption: null | string
            width: number
            height: number
            formats: {
              [key in imageSizes]: {
                name: string
                hash: string
                ext: string
                mime: string
                path: null | string
                width: number
                height: number
                size: number
                url: string
                provider_metadata: {
                  public_id: string
                  resource_type: string
                }
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: null | string
            provider: string
            provider_metadata: {
              public_id: string
              resource_type: string
            }
            createdAt: string
            updatedAt: string
          }
        }
      }
    }
  }
  meta: {}
}

export type authors = {
  data: author['data'][]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type writings = {
  data: writing['data'][]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type books = {
  data: book['data'][]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type slideStyles = 'hor' | 'ver' | 'big' | 'long' | 'short'

export type dimensions = { width: number; height: number; type: string }

export type imgAttrsMDX = { src: string; alt?: string }

export type paraTextAttrsMDX = { children: string }

export type paraImgAttrsMDX = {
  children: {
    $$typeof: Symbol
    type: [AsyncFunction: string]
    key: null
    ref: null
    props: {
      src: string
      alt?: string
    }
    _owner: null
    _store: {}
  }
}
