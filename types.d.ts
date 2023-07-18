export type imageSizes = 'thumbnail' | 'small' | 'medium' | 'large'
export type userSession = { userjwt: string|undefined; username: string|undefined }
export type jwtSession = { id: number; iat: number; exp: number}
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
      tags: string[]
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
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  book: bookInUser
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

export type writingsInUser = writingInUser[]

export type bookInUser = {
  id: number
  title: string
  introduction: string
  summary: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  writings?: writingsInUser
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
  tags: string[]
  introduction: string
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
      subtitle: string
      tags: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
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
      tags: string[]
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

export type imgAttrsMDX = { src: string; alt: string }

export type paraTextAttrsMDX = { children: string }

export type paraImgAttrsMDX = {
  children: {
    $$typeof: Symbol
    type: [AsyncFunction: string]
    key: null
    ref: null
    props: {
      src: string
      alt: string
    }
    _owner: null
    _store: {}
  }
}
