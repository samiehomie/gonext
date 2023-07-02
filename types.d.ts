import { type } from 'os'

const singleBookHasCover = {
  data: {
    id: 1,
    attributes: {
      Title: '서랍을 건너',
      publishedAt: '2023-06-25T11:02:36.832Z',
      author: {
        data: {
          id: 1,
          attributes: {
            Name: '이서랍',
          },
        },
      },
      Cover: {
        data: {
          id: 2,
          attributes: {
            formats: {
              thumbnail: {
                name: 'thumbnail_다운로드 (1).png',
                hash: 'thumbnail_1_31c40a7181',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 111,
                height: 156,
                size: 44.94,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687690934/thumbnail_1_31c40a7181.png',
                provider_metadata: {
                  public_id: 'thumbnail_1_31c40a7181',
                  resource_type: 'image',
                },
              },
              small: {
                name: 'small_다운로드 (1).png',
                hash: 'small_1_31c40a7181',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 356,
                height: 500,
                size: 340.13,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687690935/small_1_31c40a7181.png',
                provider_metadata: {
                  public_id: 'small_1_31c40a7181',
                  resource_type: 'image',
                },
              },
              medium: {
                name: 'medium_다운로드 (1).png',
                hash: 'medium_1_31c40a7181',
                ext: '.png',
                mime: 'image/png',
                path: null,
                width: 533,
                height: 750,
                size: 678.4,
                url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687690935/medium_1_31c40a7181.png',
                provider_metadata: {
                  public_id: 'medium_1_31c40a7181',
                  resource_type: 'image',
                },
              },
            },
          },
        },
      },
    },
  },
  meta: {},
}
export type singleBookHasCover = typeof singleBookHasCover

const writing = {
  id: 1,
  attributes: {
    Title: '모든 것은 쌍방과실',
    Subtitle: '관계의 끝은 누구 하나만의 잘못으로 오지 않는다.',
    Content: 'text',
    author: {
      data: {
        id: 1,
        attributes: {
          Name: '이서랍',
        },
      },
    },
    Cover: {
      data: {
        id: 13,
        attributes: {
          formats: {
            thumbnail: {
              name: 'thumbnail_1.jfif',
              hash: 'thumbnail_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 117,
              height: 156,
              size: 6.59,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/thumbnail_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'thumbnail_1_b140f12940',
                resource_type: 'image',
              },
            },
            small: {
              name: 'small_1.jfif',
              hash: 'small_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 375,
              height: 500,
              size: 39.97,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/small_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'small_1_b140f12940',
                resource_type: 'image',
              },
            },
            medium: {
              name: 'medium_1.jfif',
              hash: 'medium_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 562,
              height: 750,
              size: 72.37,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/medium_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'medium_1_b140f12940',
                resource_type: 'image',
              },
            },
          },
        },
      },
    },
  },
}

const writingHasLarge = {
  id: 1,
  attributes: {
    Title: '모든 것은 쌍방과실',
    Subtitle: '관계의 끝은 누구 하나만의 잘못으로 오지 않는다.',
    Content: 'text',
    author: {
      data: {
        id: 1,
        attributes: {
          Name: '이서랍',
        },
      },
    },
    Cover: {
      data: {
        id: 13,
        attributes: {
          formats: {
            thumbnail: {
              name: 'thumbnail_1.jfif',
              hash: 'thumbnail_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 117,
              height: 156,
              size: 6.59,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/thumbnail_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'thumbnail_1_b140f12940',
                resource_type: 'image',
              },
            },
            small: {
              name: 'small_1.jfif',
              hash: 'small_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 375,
              height: 500,
              size: 39.97,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/small_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'small_1_b140f12940',
                resource_type: 'image',
              },
            },
            medium: {
              name: 'medium_1.jfif',
              hash: 'medium_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 562,
              height: 750,
              size: 72.37,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706818/medium_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'medium_1_b140f12940',
                resource_type: 'image',
              },
            },
            large: {
              name: 'large_1.jfif',
              hash: 'large_1_b140f12940',
              ext: '.jfif',
              mime: 'image/jpeg',
              path: null,
              width: 750,
              height: 1000,
              size: 109.11,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687706819/large_1_b140f12940.jpg',
              provider_metadata: {
                public_id: 'large_1_b140f12940',
                resource_type: 'image',
              },
            },
          },
        },
      },
    },
  },
}

const authorsForSuggest = {
  data: [
    {
      id: 1,
      attributes: {
        Name: '마음돌봄',
        Introduction:
          '위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.',
        Profile: {
          data: {
            id: 10,
            attributes: {
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/small_8_7b550845e4_8498de1927.jpg',
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        Name: '밤비',
        Introduction:
          '위원은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.',
        Profile: {
          data: {
            id: 9,
            attributes: {
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/6_9177b299ef_8cc4691f38.jpg',
            },
          },
        },
      },
    },
    {
      id: 3,
      attributes: {
        Name: '달보',
        Introduction:
          '제1항의 탄핵소추는 국회재적의원 3분의 1 이상의 발의가 있어야 하며, 그 의결은 국회재적의원 과반수의 찬성이 있어야 한다. ',
        Profile: {
          data: {
            id: 8,
            attributes: {
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/9d0d0b6d5f_74c6c54319.jpg',
            },
          },
        },
      },
    },
    {
      id: 4,
      attributes: {
        Name: '오진미',
        Introduction:
          '대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.',
        Profile: {
          data: {
            id: 7,
            attributes: {
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/2_bb8b5d9b04_cdcf07ad57.jpg',
            },
          },
        },
      },
    },
    {
      id: 5,
      attributes: {
        Name: '나랏말싸미',
        Introduction:
          '대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.',
        Profile: {
          data: {
            id: 6,
            attributes: {
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/9_d95b16e055_a7b17b3ea3.jpg',
            },
          },
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 2,
      total: 10,
    },
  },
}

export type writingTitle = {
  id: number
  attributes: {
    Title: string
  }
}

export type writingTitles = {
  data: writingTitle[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
const book = {
  id: 1,
  attributes: {
    Title: '접시 하나에 정말 위로',
    Cover: {
      data: {
        id: 27,
        attributes: {
          formats: {
            thumbnail: {
              name: 'thumbnail_다운로드 (1).png',
              hash: 'thumbnail_1_8821f1236f',
              ext: '.png',
              mime: 'image/png',
              path: null,
              width: 111,
              height: 156,
              size: 17.67,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687907553/thumbnail_1_8821f1236f.png',
              provider_metadata: {
                public_id: 'thumbnail_1_8821f1236f',
                resource_type: 'image',
              },
            },
            small: {
              name: 'small_다운로드 (1).png',
              hash: 'small_1_8821f1236f',
              ext: '.png',
              mime: 'image/png',
              path: null,
              width: 356,
              height: 500,
              size: 98.89,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687907553/small_1_8821f1236f.png',
              provider_metadata: {
                public_id: 'small_1_8821f1236f',
                resource_type: 'image',
              },
            },
            medium: {
              name: 'medium_다운로드 (1).png',
              hash: 'medium_1_8821f1236f',
              ext: '.png',
              mime: 'image/png',
              path: null,
              width: 533,
              height: 750,
              size: 199.83,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687907554/medium_1_8821f1236f.png',
              provider_metadata: {
                public_id: 'medium_1_8821f1236f',
                resource_type: 'image',
              },
            },
          },
        },
      },
    },
  },
}

export type books = {
  data: (typeof book)[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const author = {
  id: 10,
  attributes: {
    Name: 'Pavittra',
    Profile: {
      data: {
        id: 1,
        attributes: {
          formats: {
            thumbnail: {
              name: 'thumbnail_1_4dca79e1f0.jpg',
              hash: 'thumbnail_1_4dca79e1f0_59657e12bf',
              ext: '.jpg',
              mime: 'image/jpeg',
              path: null,
              width: 156,
              height: 156,
              size: 5.85,
              url: 'https://res.cloudinary.com/dnxl0qysr/image/upload/v1687905835/thumbnail_1_4dca79e1f0_59657e12bf.jpg',
              provider_metadata: {
                public_id: 'thumbnail_1_4dca79e1f0_59657e12bf',
                resource_type: 'image',
              },
            },
          },
        },
      },
    },
  },
}


export type authors = {
  data: (typeof author)[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type authorWeekly = {
  id: number
  attributes: {
    Name: string
    Introduction: string
    Job: string
    Tags: string[]
    Profile: {
      data: {
        id: number
        attributes: {
          url: string
        }
      }
    }
  }
}

export type authorsWeekly = {
  data: authorWeekly[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type authorsForSuggest = typeof authorsForSuggest

export type writing = typeof writing | typeof writingHasLarge

export type writings = {
  data: [writing]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type slideStyles = 'hor' | 'ver' | 'big'

export type commonShape = {
  data: object[]
  meta: object
}
