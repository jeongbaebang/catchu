export const calcAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0

  const sum = ratings.reduce((acc, cur) => acc + cur, 0)
  const avg = sum / ratings.length

  return Math.round(avg) // 반올림해서 정수 반환
}
