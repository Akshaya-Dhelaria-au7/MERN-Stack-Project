const router = require('express').Router()
const {findTitleOfUser,updateTitlePostedByUser,deleteTitlePostedByUser} = require('../controller/profile_title_controller')
var userAuth = require('../middleware/auth')

router.get('/alltitles' , userAuth, findTitleOfUser)
router.put('/updatetitle/:_id' , userAuth , updateTitlePostedByUser)
router.delete('/deletetitle/:_id' , userAuth , deleteTitlePostedByUser)

module.exports = router
