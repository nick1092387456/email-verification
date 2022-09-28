const { checkShortURLExist } = require('../tools/checkURLExist')

const BASE_58_CHAR =
  'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789'
const MAX = 57
const MIN = 0

function genGarbled(shortenURL_Length) {
  let result = ''

  for (let i = 0; i < shortenURL_Length; i++) {
    /** 產生亂數 Index */
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    /** 依照亂數表找出對應的字元 */
    const chooseChar = BASE_58_CHAR[randomIndex]
    /** 將對應字元放入 result */
    result += chooseChar
  }

  return result
}

async function genShort() {
  const short = genGarbled(3)
  const isExist = await checkShortURLExist(short)
  if (isExist) return genShort()
  return short
}

module.exports = {
  genShort,
}
