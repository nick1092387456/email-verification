const db = require('../models')
const { urlList } = db
const backendValidation = require('../tools/backendFormValidation')

const urlListController = {
  getShortURL: async (req, res) => {
    try {
      const url = req.body.data
      console.log('------------------------' + url)
      const data = await urlList.findOne({ where: { originURL: url } })
      if (data) res.json({ link: data.shortURL })
    } catch (err) {
      console.log(err)
    }
  },
}

async function signUpURL(load, shortURL) {
  try {
    const { url, agency, email } = load
    if (
      !backendValidation.checkAgency(agency) ||
      !backendValidation.checkEmail(email) ||
      !backendValidation.checkURL(url)
    )
      throw {
        status: '400',
        message: '長網址檢驗有問題或表單資料有誤',
      }

    await urlList.create({
      shortURL,
      originURL: url,
      agency,
      email,
      isValid: false,
    })
    return { status: '200', message: '註冊成功' }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  signUpURL,
  ...urlListController,
}
