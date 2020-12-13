const router = require('express').Router()
const {createTitle,getTitlesOnTheBasisOfCategory ,getCompleteDetails} = require('../controller/title_controller')
var userAuth = require('../middleware/auth')

// router.get('/titles/:category_id' , getTitlesOnTheBasisOfCategory)
router.post('/createtitle/:category_id' , userAuth , createTitle)
router.get('/titles/:category_id' , getCompleteDetails)

module.exports = router