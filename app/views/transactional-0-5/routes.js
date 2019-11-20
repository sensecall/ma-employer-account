const express = require('express')
const router = express.Router()


function deleteData(req,param){
	req.session.data[param] = ''
}


// config
router.get('/set-config', (req, res) => {
	if(req.session.data['logged-in'] == 'true'){
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(`/${req.version}/service-start`)
	}
})

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


// set up an apprenticeship
router.post('/set-up-an-apprenticeship', (req, res) => {
	if(req.session.data['started'] == 'true'){
		if(req.session.data['provider-name']){
			res.redirect('task--reserve-funding/introduction')
		} else {
			res.redirect('task--training-provider/introduction')
		}
	} else {
		res.redirect('set-up-start')
	}
})


// Questions
router.post('/task--reserve-funding/choose-course', (req, res) => {
	req.session.data['started'] == 'true'
	
	if (req.session.data['know-course'] == 'yes' && req.session.data['course-name']){
		res.redirect('choose-start-month')
	} else {
		req.session.data['course-name'] = ''
		res.redirect('course-warning')
	}
})

router.post('/task--reserve-funding/choose-start-month', (req, res) => {
	req.session.data['started'] == 'true'

	if (req.session.data['start-month']){
		res.redirect('confirm-reservation-details')
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

// check provider
router.post('/task--training-provider/provider-check', (req, res) => {
	if (req.session.data['found-provider'] == 'yes'){
		res.redirect('choose-provider')
	} else {
		req.session.data['provider-name'] = ''
		req.session.data['training-provider-permissions'] = ''
		req.session.data['provider-permissions'] = ''
		res.redirect('error')
	}
})

// choose provider
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
	if (req.session.data['provider-name']){
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
	res.redirect('provider-confirmed')
})

router.post('/whats-next', (req, res) => {
	let userAction = req.session.data['whats-next']
	if(userAction == 'set-permissions'){
		deleteData(req,'whats-next')
		res.redirect('task--training-provider/provider-permissions')
	} else if(userAction == 'add-another'){
		deleteData(req,'whats-next')
		res.redirect('task--training-provider/choose-provider')
	} else if(userAction == 'return-to-homepage'){
		deleteData(req,'whats-next')
		res.redirect('account-home')
	}
})

router.post('/task--training-provider/provider-permissions', (req, res) => {
	req.session.data['training-provider-permissions'] = 'done'
	req.session.data['started'] == 'true'
	req.session.data['alert-text'] = 'You have added ' + req.session.data["provider-name"] + ' to your account'
	res.redirect('permissions-success')
})

router.post('/add-apprentice-details', (req, res) => {
	res.redirect('task-list')
})


module.exports = router