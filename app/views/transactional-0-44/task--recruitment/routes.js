const express = require('express')
const router = express.Router()

// vacancy name
router.post('/vacancy-name', (req, res) => {
	res.redirect('vacancy-course')
})

// course
router.post('/vacancy-course', (req, res) => {
	let course = req.session.data['vacancy']['course-name']
	req.session.data['vacancy']['course'] = {}
	req.session.data['vacancy']['course']['name'] = course.split("*")[1]
	req.session.data['vacancy']['course']['id'] = course.split("*")[2]

	res.redirect('vacancy-confirm-course')
})

// confirm course
router.post('/vacancy-confirm-course', (req, res) => {
	res.redirect('vacancy-provider')
})

// provider
router.post('/vacancy-provider', (req, res) => {
	let name = req.session.data['vacancy']['provider']['name']
	req.session.data['vacancy']['provider']['name'] = name.split("*")[0]
	req.session.data['vacancy']['provider']['ukprn'] = name.split("*")[1]
	
	res.redirect('vacancy-confirm-provider')
})

// confirm provider
router.post('/vacancy-confirm-provider', (req, res) => {
	res.redirect('vacancy-positions')
})

// positions
router.post('/vacancy-positions', (req, res) => {
	res.redirect('vacancy-employer-name')
})

// employer name
router.post('/vacancy-employer-name', (req, res) => {
	res.redirect('vacancy-work-location')
})

// work location
router.post('/vacancy-work-location', (req, res) => {
	res.redirect('vacancy-important-dates')
})

// important dates
router.post('/vacancy-important-dates', (req, res) => {
	res.redirect('vacancy-duration-hours')
})

// duration-hours
router.post('/vacancy-duration-hours', (req, res) => {
	res.redirect('vacancy-pay')
})

// pay
router.post('/vacancy-pay', (req, res) => {
	res.redirect('vacancy-go-to-preview')
})

// preview
router.post('/vacancy-preview', (req, res) => {
	// res.redirect('vacancy-emails')
	res.redirect('vacancy-created')
})

// emails
router.post('/vacancy-emails', (req, res) => {
	res.redirect('vacancy-created')
})

module.exports = router