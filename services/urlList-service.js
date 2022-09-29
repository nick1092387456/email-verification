const db = require('../models')
const { urlList } = db

const urlListServices = {
  checkState: async (req, res) => {
    try {
      const url = req.body.data
      const data = await urlList.findOne({ where: { originURL: url } })
      if (data && data.urlState === 'isValid') {
        res.status(400).json({ data: { link: data.shortURL } })
      } else {
        res.status(200).json({ data: { message: '未註冊' } })
      }
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = urlListServices
