const express = require('express')
const router = express.Router()

// vacancy name
router.post('/vacancy-name', (req, res) => {
	res.redirect('vacancy-course')
})

// course
router.post('/vacancy-course', (req, res) => {
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

module.exports = router