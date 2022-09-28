const db = require('../models')
const { urlList } = db

async function checkShortURLExist(code) {
  const isExist = await urlList.findOne({ where: { shortURL: code } })
  if (isExist) return true
  return false
}

async function checkOriginURLExist(url) {
  const isExist = await urlList.findOne({ where: { originURL: url } })
  if (isExist) return true
  return false
}

module.exports = {
  checkShortURLExist,
  checkOriginURLExist,
}
