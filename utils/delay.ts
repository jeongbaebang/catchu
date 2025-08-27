export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => {
    const ref = setTimeout(() => {
      clearTimeout(ref)
      resolve()
    }, ms)
  })
}
