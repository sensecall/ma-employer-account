const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/account-home--1-0', (req, res) => {
	res.render('account-home')
})