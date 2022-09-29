const db = require('../models')
const { urlList } = db

async function checkForm(email, url) {
  //失敗 return false
  const checkURLStateResult = await checkURLState(url)
  return !checkEmail(email) || !checkURL(url) || !checkURLStateResult
    ? false
    : true
}

function checkEmail(email) {
  let result = true
  const re = /.+@(?:[^.]+\.){0,}?gov\.tw/
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  if (
    !email ||
    !emailRule.test(email) ||
    !re.test(email) ||
    email.length <= 8 ||
    email.length >= 64
  )
    result = false
  return result
}

function checkURL(url) {
  let result = true
  const re = /http(s)?:\/\/(?:[^.]+\.){0,}?gov\.tw(\/.*)?/
  const URLRule =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
  if (
    !url ||
    !URLRule.test(url) ||
    !re.test(url) ||
    url.length <= 8 ||
    url.length >= 64
  )
    result = false
  return result
}

async function checkURLState(url) {
  //藉由返回false表示驗證失敗
  const data = await urlList.findOne({ where: { originURL: url } })
  return data && data.urlState === 'isValid' ? false : true
}

module.exports = {
  checkEmail,
  checkURL,
  checkForm,
}
