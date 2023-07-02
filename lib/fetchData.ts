
class FetchError extends Error {
  public info: any
  public status: number | undefined
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

export const getData = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export const getDataWithoutMeta = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/api/${query}`)

  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  const { data } = await res.json()
  return data
}
