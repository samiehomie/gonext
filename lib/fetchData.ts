class FetchError extends Error {
  public info: any
  public status: number | undefined
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())