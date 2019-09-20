const express = require('express')
const router = express.Router()

// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1]
  res.locals.version = req.version
  next()
})

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/account-home--1-0', (req, res) => {
	res.render('account-home')
})


router.use(/\/interim-([0-9]+)-([0-9]+)/, (req, res, next) => {
  require(`./views/interim-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/transactional-([0-9]+)-([0-9]+)/, (req, res, next) => {
  require(`./views/transactional-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/mvp-([0-9]+)/, (req, res, next) => {
  require(`./views/mvp-${req.params[0]}/routes`)(req, res, next);
})

module.exports = router
