export const generateID = (): string => {
  const date = String(Date.now()).replace(/^../, '')
  const random = String(Math.floor(Math.random() * 1000)).padEnd(4, '0')

  return String(random + date)
}
