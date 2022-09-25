const email = document.getElementById('email')
const username = document.getElementById('username')
const longURL = document.getElementById('url')

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

  //驗證姓名
  if (username.validity.typeMismatch) setErrorFor(username, "請輸入'中文'姓名")
  else if (username.validity.valueMissing)
    setErrorFor(username, '名稱欄位不可為空白')
  else if (username.validity.tooLong) setErrorFor(username, '名稱過長')
  else if (username.validity.tooShort) setErrorFor(username, '名稱過短')
  else setErrorFor(username, '格式不正確')

  //驗證網址
  if (longURL.validity.typeMismatch) setErrorFor(longURL, '網址格式不正確')
  else if (longURL.validity.patternMismatch)
    setErrorFor(longURL, "僅接受'gov.tw'的網域做轉址")
  else if (longURL.validity.valueMissing)
    setErrorFor(longURL, '長網址欄位不可為空白')
  else setErrorFor(longURL, '格式不正確')
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
