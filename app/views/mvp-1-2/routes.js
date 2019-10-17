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

router.get('/add-paye', (req, res) => {
	if( req.get('host').includes('localhost') ){
		req.session.data['add-paye-now'] = 'yes'
		
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(req.session.data['payeURL'])
	}
})

router.get('/sign-agreement', (req, res) => {
	if( req.get('host').includes('localhost') ){
		req.session.data['sign-agreement-now'] = 'yes'
		
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(req.session.data['signAgreementURL'])
	}
})


module.exports = router