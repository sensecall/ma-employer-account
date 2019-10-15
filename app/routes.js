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

// STABLE URL FOR OTHER TEAMS TO POINT TO
router.get('/stable', (req, res) => {
	res.redirect('mvp-1-1/account-home')
})

// URLS for other team projects
// Training provider permissions
const providerPermissionsURL = 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/provider-permissions/providers'
router.get('/provider-permissions', (req, res) => {
	res.redirect(providerPermissionsURL)
})
 
// Add paye
const payeURL = 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/ways-to-add-paye-scheme'
router.get('/add-paye', (req, res) => {
	res.redirect(payeURL)
})

// sign agreement
const signAgreementURL = 'https://esfa:educ4tion@das-registration-prototype.herokuapp.com/agreement'
router.get('/sign-agreement', (req, res) => {
	res.redirect(signAgreementURL)
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
