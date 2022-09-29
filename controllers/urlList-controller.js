const db = require('../models')
const { urlList } = db
const backendValidation = require('../tools/backendFormValidation')
const urlListServices = require('../services/urlList-service')

const urlListController = {
  checkState: (req, res) => {
    urlListServices.checkState(req, res)
  },
}

// async function signUpURL(load, shortURL) {
//   try {
//     const { url, agency, email } = load
//     if (!checkForm(agency, email, url))
//       throw {
//         status: '400',
//         message: '長網址檢驗有問題或表單資料有誤',
//       }

//     await urlList.create({
//       shortURL,
//       originURL: url,
//       agency,
//       email,
//       urlState,
//       verifyCode,
//     })
//     return { status: '200', message: '註冊成功' }
//   } catch (err) {
//     console.log(err)
//   }
// }

module.exports = urlListController
