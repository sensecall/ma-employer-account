const express = require('express')
const router = express.Router()


// Home page redirect
router.get('/', (req, res) => {
	res.redirect(`/${req.version}/account-home`)
})

router.post('/add-paye-question', (req, res) => {
	if(req.session.data['add-paye-now'] == 'yes'){
		res.redirect(`/${req.version}/sign-agreement-question`)
	} else {
		res.redirect(`/${req.version}/account-home`)
	}
})


module.exports = router