const email = document.getElementById('email')
const longURL = document.getElementById('url')
const agency = document.getElementById('agency')
const checkBtn = document.getElementById('checkBtn')

;(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        checkInputs()
        form.classList.add('was-validated')
      },
      false
    )
  })
})()

function checkInputs() {
  //驗證Email
  if (email.validity.typeMismatch) setErrorFor(email, '信箱格式不正確')
  else if (email.validity.patternMismatch)
    setErrorFor(email, '只接受政府單位信箱的人員註冊')
  else if (email.validity.valueMissing) setErrorFor(email, '信箱欄位不可為空白')
  else setErrorFor(email, '格式不正確')

  //驗證單位
  if (agency.validity.typeMismatch)
    setErrorFor(agency, "請輸入'中文或英文'名稱")
  else if (agency.validity.valueMissing)
    setErrorFor(agency, '單位欄位不可為空白')
  else if (agency.validity.tooLong) setErrorFor(agency, '名稱過長')
  else if (agency.validity.tooShort) setErrorFor(agency, '名稱過短')
  else setErrorFor(agency, '格式不正確')

  //驗證網址
  if (longURL.validity.typeMismatch) {
    setErrorFor(longURL, '網址格式不正確')
  } else if (longURL.validity.patternMismatch) {
    setErrorFor(longURL, "僅接受'gov.tw'的網域做轉址")
  } else if (longURL.validity.valueMissing) {
    setErrorFor(longURL, '長網址欄位不可為空白')
  } else setErrorFor(longURL, '格式不正確')
}

function setErrorFor(input, message) {
  const formControl = input.parentElement
  const messageBox = formControl.querySelector('.invalid-feedback')
  messageBox.innerText = message
}

function changeCheck(e) {
  checkInputs()
  if (e.checkValidity()) {
    e.classList.remove('is-invalid')
    e.classList.add('is-valid')
    return true
  } else {
    e.classList.add('is-invalid')
    e.classList.remove('is-valid')
    return false
  }
}

;(async function fetchAndQueryCheck() {
  try {
    checkBtn.addEventListener('click', async (e) => {
      e.preventDefault
      // fetchCheck()
      const shortURL = await queryCheck()
      console.log(shortURL)
    })
  } catch (err) {
    console.log(err)
  }
})()

async function fetchCheck() {
  try {
    const url = longURL.value
    if (!urlRegexCheck(url)) {
      alert('網址格式錯誤')
      throw new Error('網址格式錯誤')
    }
    const response = await fetch(url)
    if (response.status !== 200) {
      alert('連結無效')
      throw new Error('連結無效')
    }
  } catch (err) {
    console.log(err)
  }
}

function urlRegexCheck(url) {
  let result = true
  const re = /http(s)?:\/\/(?:[^.]+\.){0,}?gov\.tw(\/.*)?/
  const URLRule =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
  if (!url) result = false
  else if (!URLRule.test(url)) result = false
  else if (!re.test(url)) result = false
  else if (url.length <= 8 || url.length >= 64) result = false
  return result
}

async function queryCheck() {
  try {
    const myHost = window.location.origin
    const getShort = myHost + '/getShort'
    const response = await fetch(getShort, {
      method: 'POST',
      body: JSON.stringify({ data: longURL.value }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (response) {
      const data = await response.json()
      const shortURL = myHost + '/' + data.link
      return shortURL
    }
  } catch (err) {
    console.log(err)
  }
}

