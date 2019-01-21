const router = require('express').Router()
module.exports = router

const poll = [
  {
    name: 'Chelsea',
    votes: 100
  },
  {
    name: 'Arsenal',
    votes: 70
  },
  {
    name: 'Liverpool',
    votes: 250
  },
  {
    name: 'Manchester City',
    votes: 689
  },
  {
    name: 'Manchester United',
    votes: 150
  }
]

const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  encrypted: true
})

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function increment() {
  const num = getRandomNumber(0, poll.length)
  poll[num].votes += 20
}

function updatePoll() {
  setInterval(() => {
    increment()
    pusher.trigger('poll-channel', 'update-poll', {
      poll
    })
  }, 1000)
}

/// /api/poll/
router.get('/', async (req, res, next) => {
  try {
    console.log(poll)
    await res.json(poll)
    await updatePoll()
  } catch (err) {
    next(err)
  }
})
