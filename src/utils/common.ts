export const generateIdentifier = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''

  for (let i = 0; i < 20; i++) {
    id = id + chars[Math.floor(Math.random() * chars.length)]
  }

  return id
}

export const shuffle = <T>(array: Array<T>): Array<T> => {
  const newArray = array.slice()
  let j, tmp

  for (let i = newArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    tmp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = tmp
  }
  return newArray
}
