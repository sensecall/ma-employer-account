const express = require('express')
const router = express.Router()


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})

router.post('/add-paye-question', (req, res) => {
	if(req.session.data['add-paye-now'] == 'yes'){
		res.redirect(`/${req.version}/sign-agreement-question`)
	} else {
		res.redirect(`/${req.version}/account-home`)
	}
})

router.post('/sign-agreement-question', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})

// add paye external linking
router.get('/add-paye', (req, res) => {
	res.redirect(req.session.data['payeURL'] + '?referrer=' + res.locals.fullUrl + '/' + req.version + '/account-home')
})

// sign agreement external linking
router.get('/sign-agreement', (req, res) => {
	res.redirect(req.session.data['signAgreementURL'] + '?referrer=' + res.locals.fullUrl + '/' + req.version + '/account-home')
})



module.exports = router