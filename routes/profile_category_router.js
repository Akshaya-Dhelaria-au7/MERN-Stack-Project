const router = require('express').Router()
const {findCategoriesOfUser , updateCategoriesPostedByUser , deleteCategoriesPostedByUser} = require('../controller/profile_category_controller')
var userAuth = require('../middleware/auth')

router.get('/allcategories' , userAuth, findCategoriesOfUser)
router.put('/updatecategory/:_id' , userAuth , updateCategoriesPostedByUser)
router.delete('/deletecategory/:_id' , userAuth , deleteCategoriesPostedByUser)

module.exports = router