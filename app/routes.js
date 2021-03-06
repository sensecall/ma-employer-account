const express = require('express')
const router = express.Router()
const dateFilter = require('nunjucks-date-filter');

// ---------------------------------------
// ROUTING
// ---------------------------------------
// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]
	res.locals.version = req.version

	res.locals.fullUrl = req.protocol + '://' + req.get('host');
	next()
})

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/account-home--1-0', (req, res) => {
	res.render('account-home')
})

router.post('/config', (req, res) => {
	let prototypeVersion = req.session.data['prototype-version']

	res.redirect(prototypeVersion)
})

// STABLE URL FOR OTHER TEAMS TO POINT TO
router.get('/stable', (req, res) => {
	let prototypeVersion = req.session.data['prototype-version'] || 'mvp-1-1'

	res.redirect(prototypeVersion + '/account-home')
})

router.use(/\/interim-([0-9]+)-([0-9]+)/, (req, res, next) => {
	require(`./views/interim-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/transactional-([0-99]+)-([0-99]+)/, (req, res, next) => {
	require(`./views/transactional-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/concept-([0-99]+)-([0-99]+)/, (req, res, next) => {
	require(`./views/concept-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/mvp-([0-9]+)-([0-9]+)/, (req, res, next) => {
	require(`./views/mvp-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/build-([0-9]+)-([0-9]+)/, (req, res, next) => {
	require(`./views/build-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

// change of provider
router.use(/\/change-provider-([0-99]+)-([0-99]+)/, (req, res, next) => {
	require(`./views/change-provider-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

// change of provider pas
router.use(/\/change-provider-pas-([0-99]+)-([0-99]+)/, (req, res, next) => {
	require(`./views/change-provider-pas-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})


module.exports = router