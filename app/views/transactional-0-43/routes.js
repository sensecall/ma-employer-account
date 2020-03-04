const express = require('express')
const router = express.Router()
const moment = require('moment')

function deleteData(req,param){
	req.session.data[param] = ''
}


// config

router.get('/config', (req, res) => {
	req.session.data = {}
	res.render(`${req.version}/config`)
})

router.post('/config', (req, res) => {
	if(req.session.data['reserved-funding'] == 'true'){
		req.session.data['reserved-funding'] = 'true'
	} else {
		delete req.session.data['reserved-funding']
		req.session.data['reserved-funding'] = 'false'

		delete req.session.data['reservation']
		req.session.data['reservation'] = []
	}

	if(req.session.data['started-add-approve']){
		
	} else {
		req.session.data['apprentice'] = ''
		req.session.data['apprentice-dob-day'] = ''
		req.session.data['apprentice-dob-month'] = ''
		req.session.data['apprentice-dob-year'] = ''
		delete req.session.data['apprenticeship-status']
	}

	if(req.session.data['started-vacancy']){
		
	} else {
		req.session.data['vacancy'] = {}
		delete req.session.data['vacancy']
	}

	if(req.session.data['logged-in'] == 'true'){
		res.redirect(`/${req.version}/account-home`)
	} else {
		res.redirect(`/${req.version}/service-start`)
	}
})

// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/config`)
})

// add paye external linking
router.get('/add-paye', (req, res) => {
	res.redirect(req.session.data['payeURL'] + '?referrer=' + res.locals.fullUrl + '/' + req.version + '/account-home')
})

// sign agreement external linking
router.get('/sign-agreement', (req, res) => {
	res.redirect(req.session.data['signAgreementURL'] + '?referrer=' + res.locals.fullUrl + '/' + req.version + '/account-home')
})

// login
router.post('/login', (req, res) => {
	req.session.data['sign-agreement-now'] = 'yes'
	req.session.data['add-paye-now'] = 'yes'

	res.redirect('account-home')
})


// set up an apprenticeship
router.post('/set-up-an-apprenticeship', (req, res) => {
	// started
	let started = (req.session.data['started'] == 'true') ? true : false

	// provider-added
	let providerAdded = (req.session.data['provider-name']) ? true : false

	// reserved-funding
	let reservedFunding = (req.session.data['reserved-funding'] == 'true') ? true : false

	// created-vacancy
	let recruitment = (req.session.data['vacancy-created']) ? true : false

	// apprentice-details
	let apprenticeDetails = (req.session.data['apprentice-added']) ? true : false

	if(!started){
		res.redirect('eligibility-course-provider')
	} else if(!providerAdded){
		res.redirect('task--training-provider/introduction')
	} else if(providerAdded && !reservedFunding){
		res.redirect('task--reserve-funding/introduction')
	} else if(providerAdded && reservedFunding && !recruitment){
		res.redirect('task--recruitment/recruitment-check')
	} else if(providerAdded && reservedFunding && recruitment && !apprenticeDetails){
		res.redirect('task--apprentice-details/apprentice-details-check')
	}
})

// recruit to add
router.post('/recruit-to-add', (req, res) => {
	req.session.data['apprentice'] = {}
	res.redirect('task--apprentice-details/start')
})


// Eligibility
router.post('/eligibility-course-provider', (req, res) => {
	let course = req.session.data['course-name']
	req.session.data['course-name'] = course.split("*")[1]
	req.session.data['course-id'] = course.split("*")[0]

	let provider = req.session.data['provider-name']
	req.session.data['provider-name'] = provider.split("*")[0]
	req.session.data['provider-ukprn'] = provider.split("*")[1]
	
	if (req.session.data['eligibility-course-provider'] == 'yes'){
		res.redirect('eligibility-start-date')
	} else {
		res.redirect('eligibility-inform-fat')
	}
})

// Eligibility - course
router.post('/eligibility-course', (req, res) => {	
	if (req.session.data['eligibility-course'] == 'yes'){
		res.redirect('eligibility-provider')
	} else {
		res.redirect('eligibility-inform-course')
	}
})

// Eligibility - provider
router.post('/eligibility-provider', (req, res) => {	
	if (req.session.data['eligibility-provider'] == 'yes'){
		res.redirect('eligibility-start-date')
	} else {
		res.redirect('eligibility-inform-provider')
	}
})

router.post('/eligibility-start-date', (req, res) => {
	if (req.session.data['eligibility-start-date'] == 'yes'){
		res.redirect('eligibility-recruit')
	} else {
		res.redirect('eligibility-inform-contact-provider')
	}
})

router.post('/eligibility-recruit', (req, res) => {
	res.redirect('eligibility-start')
})

// continue set up
router.post('/continue-set-up', (req, res) => {
	if (req.session.data['continue-set-up'] == 'no'){
		req.session.data['apprentice'] = {}
		res.redirect('task--apprentice-details/start')
	} else {
		res.redirect('task--recruitment/recruitment-start')
	}
})


// Reserve funding
router.post('/task--reserve-funding/reserve-funding-start-page', (req, res) => {
	req.session.data['reservation'] = {}
	req.session.data['reservation']['course-name'] = ''
	res.redirect('choose-course')
})

// Questions
router.post('/task--reserve-funding/choose-course', (req, res) => {
	req.session.data['started'] == 'true'
	req.session.data['reservation']['start-month'] == ''
	
	if (req.session.data['know-course'] == 'yes' && req.session.data['reservation']['course-name']){
		res.redirect('choose-start-month')
	} else {
		delete req.session.data['reservation']['course-name']
		res.redirect('course-warning')
	}
})

router.post('/task--reserve-funding/choose-start-month', (req, res) => {
	req.session.data['started'] == 'true'
	req.session.data['reservation']['end-month'] = moment(req.session.data['reservation']['start-month']).add(2,'months').format('MMMM YYYY')

	if (req.session.data['reservation']['start-month']){
		res.redirect('confirm-reservation-details')
	} else {
		delete req.session.data['reservation']
		res.redirect('start-month-warning')
	}
})

router.post('/task--reserve-funding/confirm-reservation-details', (req, res) => {
	if (req.session.data['confirm-reservation-details'] == 'yes'){
		req.session.data['reserved-funding'] = 'true'
		req.session.data['alert-text'] = 'You have reserved funds for apprenticeship training'
		res.redirect('reservation-success')
	} else {
		req.session.data['started'] == 'true'
		res.redirect('../account-home')
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

router.post('/task--training-provider/error', (req, res) => {
	if(req.session.data['reserved-funding'] == 'true'){
		res.redirect('../task--recruitment/recruitment-check')
	} else {
		res.redirect('../task--reserve-funding/introduction')
	}
})

router.post('/task--training-provider/confirm-provider', (req, res) => {
	req.session.data['choose-provider'] = 'done'
	req.session.data['training-provider-permissions'] = ''
	req.session.data['provider-permissions'] = ''
	req.session.data['started'] == 'true'
	res.redirect('provider-confirmed')
})


// recruitment
router.post('/task--recruitment/recruitment-check', (req, res) => {
	if(req.session.data['recruitment-check'] == 'yes'){
		res.redirect('recruitment-start')
	} else {
		req.session.data['started'] == 'true'
		req.session.data['vacancy-created'] = 'n/a'
		delete req.session.data['vacancy']['name']
		res.redirect('../task--apprentice-details/apprentice-details-check')
	}
})

// vacancy name
router.post('/task--recruitment/vacancy-name', (req, res) => {
	if(req.session.data['vacancy']['name']){
		req.session.data['vacancy']['end-date'] = '20 January 2020'
		req.session.data['vacancy']['status'] = 'live'
		res.redirect('vacancy-created')
	} else {
		res.redirect('vacancy-name')
	}
})

// apprentice details
router.post('/task--apprentice-details/apprentice-details-check', (req, res) => {
	if(req.session.data['apprentice-details-check'] == 'yes'){
		res.redirect('introduction')
	} else {
		res.redirect('../account-home')
	}
})

router.post('/task--apprentice-details/confirm-provider', (req, res) => {
	if(req.session.data['confirm-provider'] == 'yes'){
		res.redirect('permission')
	} else {
		res.redirect('add-provider')
	}
})

router.post('/task--apprentice-details/permission', (req, res) => {
	if(req.session.data['add-permissions'] == 'employer'){
		if(req.session.data['eligibility-recruit'] == 'existing' || req.session.data['reserved-funding'] != 'true'){
			res.redirect('../task--reserve-funding/choose-course')
		} else {
			res.redirect('add-apprentice-details')
		}
	} else {
		res.redirect('permission')
	}
})

router.post('/task--apprentice-details/add-apprentice-details', (req, res) => {
	req.session.data['apprenticeship-status'] = 'draft'
	res.redirect('approve')
})

router.post('/task--apprentice-details/approve', (req, res) => {
	req.session.data['apprentice']['first-name'] = req.session.data['apprentice']['first-name'] || 'Jo'
	req.session.data['apprentice']['last-name'] = req.session.data['apprentice']['last-name'] || 'Smith'
	req.session.data['apprentice-dob-day'] = req.session.data['apprentice-dob-day'] || '21'
	req.session.data['apprentice-dob-month'] = req.session.data['apprentice-dob-month'] || '11'
	req.session.data['apprentice-dob-year'] = req.session.data['apprentice-dob-year'] || '1999'
	req.session.data['apprenticeship-finish-date-month'] = req.session.data['apprenticeship-finish-date-month'] || '03'
	req.session.data['apprenticeship-finish-date-year'] = req.session.data['apprenticeship-finish-date-year'] || '2022'

	if(req.session.data['approve-details'] == 'yes'){
		req.session.data['apprenticeship-status'] = 'live'
		res.redirect('submitted')
	} else {
		res.redirect('approve')
	}
})


// whats next
router.post('/whats-next', (req, res) => {
	let userAction = req.session.data['whats-next']
	if(userAction == 'set-permissions'){
		delete req.session.data['whats-next']
		res.redirect('task--training-provider/provider-permissions')
	} else if(userAction == 'add-another'){
		delete req.session.data['whats-next']
		res.redirect('task--training-provider/choose-provider')
	} else if(userAction == 'add-apprentice-details'){
		delete req.session.data['whats-next']
		req.session.data['apprentice'] = {}

		if(req.session.data['eligibility-recruit'] == 'existing'){
			res.redirect('task--apprentice-details/add-apprentice-details')
		} else {
			res.redirect('task--apprentice-details/start')
		}
	} else if(userAction == 'recruit'){
		delete req.session.data['whats-next']
		res.redirect('task--recruitment/recruitment-start')
	} else if(userAction == 'find-training-provider'){
		delete req.session.data['whats-next']
		res.redirect('http://findapprenticeshiptraining.apprenticeships.education.gov.uk/')
	} else {
		delete req.session.data['whats-next']
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
	res.redirect('account-home')
})


// recruit
router.get('/recruit', (req, res) => {
	if(req.session.data['vacancy']){
		res.redirect('recruit-dashboard')
	} else {
		res.redirect('task--recruitment/recruitment-start')
	}
})

module.exports = router