const express = require('express')
const router = express.Router()


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})


module.exports = router