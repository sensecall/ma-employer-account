const express = require('express')
const router = express.Router()


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})

// add paye external linking
router.get('/add-paye', (req, res) => {
	if( req.get('host').includes('localhost') ){
		req.session.data['add-paye-now'] = 'yes'
		
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(payeURL)
	}
})

// sign agreement external linking
router.get('/sign-agreement', (req, res) => {
	if( req.get('host').includes('localhost') ){
		req.session.data['sign-agreement-now'] = 'yes'
		
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(signAgreementURL)
	}
})


router.get('/interstitial', (req, res) => {
	if (req.session.data['hide-interstitial'] == 'true'){
		res.redirect('task-list')
	} else {
		res.render(`${req.version}/interstitial`)
	}
})

// Questions
router.post('/q--know-course', (req, res) => {
	if (req.session.data['know-course'] == 'yes'){
		res.redirect('q--know-start-date')
	} else {
		res.redirect('q--reserve-warning')
	}
})

router.post('/q--know-start-date', (req, res) => {
	if (req.session.data['know-start-date'] == 'yes'){
		res.redirect('q--enter-start-date')
	} else {
		res.redirect('q--reserve-warning')
	}
})

router.post('/q--enter-start-date', (req, res) => {
	res.redirect('q--reserve-confirmation')
})

router.post('/q--reserve-warning', (req, res) => {
	res.redirect('q--found-apprentice')
})

router.post('/q--reserve-confirmation', (req, res) => {
	res.redirect('q--found-apprentice')
})

router.post('/q--found-provider', (req, res) => {
	if (req.session.data['found-provider'] == 'yes'){
		res.redirect('q--confirm-provider')
	} else {
		res.redirect('q--know-course')
	}
})

router.post('/q--confirm-provider', (req, res) => {
	if (req.session.data['confirm-provider-details'] == 'yes'){
		res.redirect('q--provider-permission')
	} else {
		res.redirect('q--found-provider')
	}
})

router.post('/q--provider-permission', (req, res) => {
	if (req.session.data['provider-permission'] == 'yes'){
		res.redirect('q--set-provider-permission')
	} else {
		res.redirect('q--know-course')
	}
})

router.post('/q--set-provider-permission', (req, res) => {
	res.redirect('q--permissions-confirmation')
})

router.post('/q--found-apprentice', (req, res) => {
	if (req.session.data['found-apprentice'] == 'yes'){
		res.redirect('add-apprentice-details')
	} else {
		res.redirect('q--need-vacancy')
	}
})

router.post('/q--need-vacancy', (req, res) => {
	if (req.session.data['need-vacancy'] == 'yes'){
		res.redirect('q--need-vacancy')
	} else {
		res.redirect('task-list')
	}
})

router.post('/add-apprentice-details', (req, res) => {
	res.redirect('task-list')
})


module.exports = router