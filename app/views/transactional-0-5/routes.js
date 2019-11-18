const express = require('express')
const router = express.Router()

// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/service-start`)
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
	req.session.data['alert-text'] = ''
	res.render(`${req.version}/task-list`)
})

// login
router.post('/login', (req, res) => {
	req.session.data['sign-agreement-now'] = 'yes'
	req.session.data['add-paye-now'] = 'yes'

	res.redirect('account-home')
})

// Questions
router.post('/task--reserve-funding/choose-course', (req, res) => {
	if (req.session.data['know-course'] == 'yes' && req.session.data['course-name']){
		res.redirect('confirm-course')
	} else {
		req.session.data['course-name'] = ''
		res.redirect('course-warning')
	}
})

// Questions
router.post('/task--reserve-funding/confirm-course', (req, res) => {
	if (req.session.data['confirm-course'] == 'yes'){
		req.session.data['started'] == 'true'
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
		res.redirect('start-month-warning')
	}
})

router.post('/task--reserve-funding/choose-start-month', (req, res) => {
	req.session.data['started'] == 'true'

	if (req.session.data['start-month']){
		res.redirect('../task-list')
	} else {
		req.session.data['start-month'] = ''
		res.redirect('start-month-warning')
	}
})

router.post('/task--reserve-funding/confirm-reservation-details', (req, res) => {
	if (req.session.data['confirm-reservation-details'] == 'yes'){
		req.session.data['reservation-confirmed'] = 'true'
		req.session.data['alert-text'] = 'You have reserved funds for apprenticeship training'
		res.redirect('reservation-success')
	} else {
		req.session.data['started'] == 'true'
		res.redirect('../task-list')
	}
})

// Training provider
router.get('/task--training-provider/choose-provider', (req, res) => {
	if(req.session.data['provider-name'] != ''){
		req.session.data['old-provider-name'] = req.session.data['provider-name']
		req.session.data['change-provider'] = 'true'
	} else {
		req.session.data['change-provider'] = 'false'
		req.session.data['old-provider-name'] = ''
	}

	res.render(`${req.version}/task--training-provider/choose-provider`)
})

router.post('/task--training-provider/choose-provider', (req, res) => {
	if (req.session.data['found-provider'] == 'yes'){
		res.redirect('confirm-provider')
	} else {
		req.session.data['provider-name'] = ''
		req.session.data['training-provider-permissions'] = ''
		req.session.data['provider-permissions'] = ''
		res.redirect('error')
	}
})

router.post('/task--training-provider/confirm-provider', (req, res) => {
	req.session.data['choose-provider'] = 'done'
	req.session.data['training-provider-permissions'] = ''
	req.session.data['provider-permissions'] = ''
	req.session.data['started'] == 'true'
	res.redirect('../task-list')
})

router.post('/task--training-provider/provider-permissions', (req, res) => {
	req.session.data['training-provider-permissions'] = 'done'
	req.session.data['started'] == 'true'
	req.session.data['alert-text'] = 'You have added ' + req.session.data["provider-name"] + ' to your account'
	res.redirect('../task-list')
})

router.post('/add-apprentice-details', (req, res) => {
	res.redirect('task-list')
})


module.exports = router