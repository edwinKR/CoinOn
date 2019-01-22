const router = require('express').Router()
module.exports = router

const axios = require('axios')
const safeJsonStringify = require('safe-json-stringify')

router.get('/:cryptocurrency/:currency', async (req, res, next) => {
  try {
    const currencyData = await axios.get(
      `https://api.coinmarketcap.com/v1/ticker/${
        req.params.cryptocurrency
      }/?convert=${req.params.currency}`
    )

    const safeData = safeJsonStringify(currencyData.data)
    res.send(safeData)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const coinData = await axios.get(`https://api.coinmarketcap.com/v1/ticker`)

    const safeData = safeJsonStringify(coinData.data)
    res.send(safeData)
  } catch (err) {
    next(err)
  }
})

router.get('/historical', async (req, res, next) => {
  try {
    const coinData = await axios.get(
      `https://api.coinmarketcap.com/v1/cryptocurrency/listings/historical`
    )

    const safeData = safeJsonStringify(coinData.data)
    res.send(safeData)
  } catch (err) {
    next(err)
  }
})
