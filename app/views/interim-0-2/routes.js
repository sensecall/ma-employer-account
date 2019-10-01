const express = require('express')
const router = express.Router()


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})


router.get('/interstitial', (req, res) => {
	if (req.session.data['hide-interstitial'] == 'true'){
		res.redirect('task-list')
	} else {
		res.render(`${req.version}/interstitial`)
	}
})


module.exports = router