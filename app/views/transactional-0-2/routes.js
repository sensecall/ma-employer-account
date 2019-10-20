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
router.post('/q--know-course', (req, res) => {
	if (req.session.data['know-course'] == 'yes'){
		if (req.session.data['funding-journey'] == 'true') {
			res.redirect('q--know-start-date')
		} else {
			if (req.session.data['return-to-task-list'] == 'true'){
				res.redirect('task-list')
			} else {
				res.redirect('q--know-start-date')
			}
		}
	} else {
		req.session.data['course-name'] = ''

		res.redirect('q--reserve-warning')
	}
})

router.post('/q--know-start-date', (req, res) => {
	if (req.session.data['know-start-date'] == 'yes'){
		res.redirect('q--enter-start-date')
	} else {
		req.session.data['start-date'] = ''
		
		if (req.session.data['funding-journey'] == 'true') {
			res.redirect('q--reserve-warning')
		} else {
			if (req.session.data['return-to-task-list'] == 'true'){
				res.redirect('task-list')
			} else {
				res.redirect('q--reserve-warning')
			}
		}
	}
})

router.post('/q--enter-start-date', (req, res) => {
	if (req.session.data['funding-journey'] == 'true') {
		res.redirect('q--reserve-confirmation')
	} else {
		if (req.session.data['return-to-task-list'] == 'true'){
			res.redirect('task-list')
		} else {
			res.redirect('q--found-apprentice')
		}
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

router.post('/q--found-provider', (req, res) => {
	if (req.session.data['found-provider'] == 'yes'){
		res.redirect('q--confirm-provider')
	} else {
		req.session.data['provider-name'] = ''

		if (req.session.data['return-to-task-list'] == 'true'){
			res.redirect('task-list')
		} else {
			res.redirect('g--funding')
		}
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
		if (req.session.data['return-to-task-list'] == 'true'){
			res.redirect('task-list')
		} else {
			res.redirect('g--funding')
		}
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