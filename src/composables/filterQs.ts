interface Params {
  [key: string]: string | undefined
}

export default function filterQs(query: Params) {
  const filteredQuery = Object.keys(query)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    .filter((key) => query[key] !== undefined && query[key] !== "")
    .reduce((obj, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      obj[key] = query[key]
      return obj
    }, {})

    return filteredQuery
}
