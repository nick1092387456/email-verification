const urlCheckBtn = document.getElementById('checkBtn')
const submitButton = document.getElementById('submitButton')
let checkStatus = false

;(function validate_submit() {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  const urlElement = document.getElementById('url')
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      async (event) => {
        if (checkSubmit() === false) {
          event.preventDefault()
          event.stopPropagation()
          const checkURLStateResult = await checkURLState(urlElement)
          if (checkURLStateResult) {
            urlElement.classList.add('is-invalid')
            urlElement.classList.remove('is-valid')
            setErrorFor(urlElement, '此網址已經註冊')
          }
        }
      },
      false
    )
  })
})()
;(function validate_url() {
  const urlElement = document.getElementById('url')
  urlElement.addEventListener('input', (e) => {
    checkStatus = false

    if (checkURL(urlElement) === false) {
      urlElement.classList.add('is-invalid')
      urlElement.classList.remove('is-valid')
      urlCheckBtn.disabled = true
    } else {
      urlCheckBtn.disabled = false
      setErrorFor(urlElement, '請點擊右側檢測')
    }
  })
})()
;(function validate_email() {
  const emailElement = document.getElementById('email')
  emailElement.addEventListener('input', (e) => {
    if (checkEmail(emailElement) === false) {
      emailElement.classList.add('is-invalid')
      emailElement.classList.remove('is-valid')
    } else {
      emailElement.classList.remove('is-invalid')
      emailElement.classList.add('is-valid')
    }
  })
})()
;(async function validateURLClick() {
  try {
    const urlCheckResultModal = new bootstrap.Modal(
      document.getElementById('urlCheckResultModal'),
      {}
    )
    urlCheckBtn.addEventListener('click', async (e) => {
      const urlElement = document.getElementById('url')
      const shortURL = await checkURLState(urlElement)
      if (shortURL) {
        e.preventDefault
        setModalInput(shortURL)
        setErrorFor(urlElement, '此網址已經註冊')
        urlElement.classList.add('is-invalid')
        urlElement.classList.remove('is-valid')
        urlCheckResultModal.show()
      } else {
        urlElement.classList.remove('is-invalid')
        urlElement.classList.add('is-valid')
        urlElement.readOnly = true
        urlCheckBtn.disabled = true
        checkStatus = true
      }
    })
  } catch (err) {
    console.log(err)
  }
})()

function checkSubmit() {
  const urlElement = document.getElementById('url')
  const emailElement = document.getElementById('email')
  let result = true
  //驗證網址
  if (checkURL(urlElement) === false) {
    urlElement.classList.add('is-invalid')
    urlElement.classList.remove('is-valid')
    result = false
  } else {
    urlElement.classList.remove('is-invalid')
    urlElement.classList.add('is-valid')
  }

  //驗證Email
  if (checkEmail(emailElement) === false) {
    emailElement.classList.add('is-invalid')
    emailElement.classList.remove('is-valid')
    result = false
  } else {
    emailElement.classList.remove('is-invalid')
    emailElement.classList.add('is-valid')
  }

  //驗證檢測按鈕是否檢測

  if (checkStatus === false) result = false
  return result
}
function checkURL(urlElement) {
  let result = false
  const url = urlElement.value
  const re = /http(s)?:\/\/(?:[^.]+\.){0,}?gov\.tw(\/.*)?/
  const URLRule =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/
  if (!url) {
    setErrorFor(urlElement, '長網址欄位不可為空白')
    return result
  }
  if (!URLRule.test(url)) {
    setErrorFor(urlElement, '網址格式不正確')
    return result
  }
  if (!re.test(url)) {
    setErrorFor(urlElement, "僅接受'gov.tw'的網域做轉址")
    return result
  }
  if (url.length <= 14) {
    setErrorFor(urlElement, '網址太短')
    return result
  }
  if (url.length >= 2048) {
    setErrorFor(urlElement, '網址過長')
    return result
  }
  urlElement.value = url.replace(/^http:\/\//i, 'https://')
  result = true
  return result
}
function checkEmail(emailElement) {
  let result = false
  const email = emailElement.value
  const re = /.+@(?:[^.]+\.){0,}?gov\.tw/
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  if (!email) {
    setErrorFor(emailElement, '信箱欄位不可為空白')
    return result
  }
  if (!emailRule.test(email)) {
    setErrorFor(emailElement, '信箱格式不正確')
    return result
  }
  if (!re.test(email)) {
    setErrorFor(emailElement, '只接受政府單位信箱的人員註冊')
    return result
  }
  if (email.length <= 8) {
    setErrorFor(emailElement, '信箱過短')
    return result
  }
  if (email.length >= 64) {
    setErrorFor(emailElement, '信箱過長')
    return result
  }
  result = true
  return result
}
function setErrorFor(selectedElement, message) {
  const formControl = selectedElement.parentElement
  const messageBox = formControl.querySelector('.invalid-feedback')
  messageBox.innerText = message
}

async function checkURLStatus(urlElement) {
  try {
    const url = urlElement.value
    if (checkURL(urlElement) === false) {
      urlCheckBtn.disabled = true
      return
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
async function checkURLState(urlElement) {
  try {
    const myHost = window.location.origin
    const checkState = myHost + '/checkState'
    const response = await fetch(checkState, {
      method: 'POST',
      body: JSON.stringify({ data: urlElement.value }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      const { data } = await response.json()
      const shortURL = myHost + '/' + data.link
      return shortURL
    }
    return false
  } catch (err) {
    console.log(err)
  }
}

function setModalInput(content) {
  const modalBody = document.getElementById('shortIsExistModalContent')
  modalBody.innerHTML = `<p>${content}</p>`
}
