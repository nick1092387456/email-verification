const urlListServices = require('../services/urlList-service')

const urlListController = {
  checkState: (req, res) => {
    urlListServices.checkState(req, res)
  },
}

module.exports = urlListController
