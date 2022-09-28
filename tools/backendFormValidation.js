const { checkOriginURLExist } = require('../tools/checkURLExist')

function checkAgency(agency) {
  let result = true
  if (!agency) result = false
  if (typeof agency !== 'string') result = false
  if (agency.length <= 2 || agency.length >= 50) result = false
  return result
}

function checkEmail(email) {
  let result = true
  const re = /.+@(?:[^.]+\.){0,}?gov\.tw/
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  if (!email) result = false
  else if (!emailRule.test(email)) result = false
  else if (!re.test(email)) result = false
  else if (email.length <= 8 || email.length >= 64) result = false
  return result
}

async function checkURL(url) {
  let result = true
  const isExist = await checkOriginURLExist(url)
  const re = /http(s)?:\/\/(?:[^.]+\.){0,}?gov\.tw(\/.*)?/
  const URLRule =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
  if (!url) result = false
  else if (isExist) result = false
  else if (!URLRule.test(url)) result = false
  else if (!re.test(url)) result = false
  else if (url.length <= 8 || url.length >= 64) result = false
  return result
}

module.exports = {
  checkAgency,
  checkEmail,
  checkURL,
}
