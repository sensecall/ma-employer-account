const express = require('express')
const router = express.Router()

// Home page redirect
router.get('/', (req, res) => {
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

router.get('/task-list', (req, res) => {
	req.session.data['return-to-task-list'] = 'false'
	req.session.data['started'] = 'true'

	res.render(`${req.version}/task-list`)
})


router.get('/interstitial', (req, res) => {
	if (req.session.data['hide-interstitial'] == 'true'){
		res.redirect('task-list')
	} else {
		res.render(`${req.version}/interstitial`)
	}
})

// Questions
router.post('/task--reserve-funding/choose-course', (req, res) => {
	if (req.session.data['know-course'] == 'yes' && req.session.data['course-name']){
		res.redirect('confirm-course')
	} else {
		res.redirect('reserve-warning')
	}
})

// Questions
router.post('/task--reserve-funding/confirm-course', (req, res) => {
	if (req.session.data['confirm-course'] == 'yes'){
		res.redirect('../task-list')
	} else {
		res.redirect('choose-course')
	}
})

router.post('/task--reserve-funding/know-start-month', (req, res) => {
	if (req.session.data['know-start-month'] == 'yes'){
		res.redirect('choose-start-month')
	} else {
		req.session.data['start-month'] = ''
		res.redirect('reserve-warning')
	}
})

router.post('/task--reserve-funding/choose-start-month', (req, res) => {
	if (req.session.data['course-name']){
		res.redirect('confirm-reservation-details')
	} else {
		res.redirect('../task-list')
	}
})

router.post('/task--reserve-funding/confirm-reservation-details', (req, res) => {
	if (req.session.data['confirm-reservation-details'] == 'yes'){
		req.session.data['reservation-confirmed'] = 'true'
		res.redirect('reservation-success')
	} else {
		res.redirect('../task-list')
	}
})

router.post('/g--funding', (req, res) => {
	let chosenCourse = req.session.data['know-course'] == 'yes' && req.session.data['course-name']
	let chosenStartDate = req.session.data['know-start-date'] == 'yes' && req.session.data['start-date']

	if(!chosenCourse && !chosenStartDate) {
		res.redirect('g--know-course')
	} else if (chosenCourse && !chosenStartDate){
		res.redirect('q--know-start-date')
	} else if (chosenStartDate && !chosenCourse){
		res.redirect('q--know-course')
	} else if (chosenCourse && chosenStartDate){
		res.redirect('q--reserve-confirmation')
	}
})

router.post('/q--reserve-warning', (req, res) => {
	if (req.session.data['return-to-task-list'] == 'true'){
		res.redirect('task-list')
	} else {
		res.redirect('q--found-apprentice')
	}
})

router.post('/q--reserve-confirmation', (req, res) => {
	if (req.session.data['return-to-task-list'] == 'true'){
		res.redirect('task-list')
	} else {
		res.redirect('q--found-apprentice')
	}
})

// Training provider
router.post('/task--training-provider/choose-provider', (req, res) => {
	if (req.session.data['found-provider'] == 'yes'){
		res.redirect('confirm-provider')
	} else {
		req.session.data['provider-name'] = ''

		res.redirect('error')
	}
})

router.post('/task--training-provider/confirm-provider', (req, res) => {
	if (req.session.data['confirm-provider-details'] == 'yes'){
		req.session.data['choose-provider'] = 'done'
		res.redirect('provider-permissions')
	} else {
		req.session.data['choose-provider'] = ''
		res.redirect('choose-provider')
	}
})

router.post('/task--training-provider/provider-permissions', (req, res) => {
	if (req.session.data['provider-permissions'] == 'yes'){
		res.redirect('set-provider-permissions')
	} else {
		req.session.data['training-provider-permissions'] = 'done'
		res.redirect('success')
	}
})

router.post('/task--training-provider/set-provider-permissions', (req, res) => {
	req.session.data['training-provider-permissions'] = 'done'
	res.redirect('permissions-success')
})

router.post('/task--training-provider/success', (req, res) => {
	req.session.data['training-provider-permissions'] = 'done'
	res.redirect('../task-list')
})

router.post('/q--found-apprentice', (req, res) => {
	if (req.session.data['found-apprentice'] == 'yes'){
		res.redirect('add-apprentice-details')
	} else {
		res.redirect('q--need-vacancy')
	}
})

router.post('/q--need-vacancy', (req, res) => {
	if (req.session.data['return-to-task-list'] == 'true'){
		res.redirect('task-list')
	} else {
		if (req.session.data['need-vacancy'] == 'yes'){
			res.redirect('q--need-vacancy')
		} else {
			res.redirect('task-list')
		}
	}
})

router.post('/add-apprentice-details', (req, res) => {
	res.redirect('task-list')
})


module.exports = router