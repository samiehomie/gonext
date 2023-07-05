export type imageSizes = 'thumbnail' | 'small' | 'medium' | 'large'

export type author = {
  data: {
    id: number
    attributes: {
      Name: string
      Introduction: string
      Email: string
      Job: string
      Tags: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
      writings?: writings
      books?: books
      Profile?: {
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
      Title: string
      Content: string
      Created: string
      Subtitle: string
      Tags: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
      author?: author
      book?: book
      Cover?: {
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
      Title: string
      Introduction: string
      Summary: string[]
      Tags: string[]
      createdAt: string
      updatedAt: string
      publishedAt: string
      author?: author
      writings?: writings
      Cover?: {
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
