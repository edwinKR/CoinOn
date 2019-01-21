const router = require('express').Router()
module.exports = router

const axios = require('axios')
const safeJsonStringify = require('safe-json-stringify')

const API_KEY = {
  key: process.env.key
}

router.get('/', async (req, res, next) => {
  try {
    const coinData = await axios.get('https://api.coinmarketcap.com/v1/ticker/')

    const safeData = safeJsonStringify(coinData.data)
    res.send(safeData)
  } catch (err) {
    next(err)
  }
})
