export type imageSizes = 'thumbnail' | 'small' | 'medium' | 'large'

export type writingForUser = {
  id: number
  title: string
  content: string
  created: string
  subtitle: string
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  book: bookForUser
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

export type writingsForUser = writingForUser[]

type bookForUser = {
  id: number
  title: string
  introduction: string
  summary: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  writings?: writingsForUser
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
  writings?: writingsForUser
  books?: bookForUser[]
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
      user?: { data: user }
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

const tempUser = {
  data: {
    id: 1,
    attributes: {
      username: 'pavittra',
      email: 'someone3s@example.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
      job: '크리에이터',
      tags: ['에세이', '여행', '육아', '기획자', '사랑'],
      introduction:
        '대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.',
      createdAt: '2023-07-12T17:05:55.646Z',
      updatedAt: '2023-07-12T17:05:55.646Z',
      profile: {
        data: {
          id: 55,
          attributes: {
            name: '제목 없음 (11).png',
            alternativeText: null,
            caption: null,
            width: 1080,
            height: 1080,
            formats: {
              thumbnail: {
                name: 'thumbnail_제목 없음 (11).png',
                hash: 'thumbnail_11_2feae87553',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 156,
                height: 156,
                size: 38.42,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1688993733/thumbnail_11_2feae87553.png',
                provider_metadata: {
                  public_id: 'thumbnail_11_2feae87553',
                  resource_type: 'image',
                },
              },
              small: {
                name: 'small_제목 없음 (11).png',
                hash: 'small_11_2feae87553',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 500,
                height: 500,
                size: 284.72,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1688993734/small_11_2feae87553.png',
                provider_metadata: {
                  public_id: 'small_11_2feae87553',
                  resource_type: 'image',
                },
              },
              medium: {
                name: 'medium_제목 없음 (11).png',
                hash: 'medium_11_2feae87553',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 750,
                height: 750,
                size: 580.28,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1688993734/medium_11_2feae87553.png',
                provider_metadata: {
                  public_id: 'medium_11_2feae87553',
                  resource_type: 'image',
                },
              },
              large: {
                name: 'large_제목 없음 (11).png',
                hash: 'large_11_2feae87553',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 1000,
                height: 1000,
                size: 944.22,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1688993735/large_11_2feae87553.png',
                provider_metadata: {
                  public_id: 'large_11_2feae87553',
                  resource_type: 'image',
                },
              },
            },
            hash: '11_2feae87553',
            ext: '.png',
            mime: 'image/png',
            size: 250.85,
            url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1688993733/11_2feae87553.png',
            previewUrl: null,
            provider: 'cloudinary',
            provider_metadata: {
              public_id: '11_2feae87553',
              resource_type: 'image',
            },
            createdAt: '2023-07-10T12:55:35.939Z',
            updatedAt: '2023-07-10T12:55:35.939Z',
          },
        },
      },
    },
  },
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
      user?: typeof tempUser
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
