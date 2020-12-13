var express = require('express');
var router = express.Router();
var {createCategory , getAllCategories , updateCategory , deleteCategory , getLinkOnTheBasisOfCategory,searchCategory} = require('../controller/category_controller')
var categoryValidation = require('../validation/category_validation')
var userAuth = require('../middleware/auth')

router.post('/category' , userAuth , createCategory)
router.get('/allcategory' , getAllCategories)
router.put('/update/:_id' , userAuth  , updateCategory)
router.delete('/delete/:_id' , userAuth , deleteCategory)
router.post('/search' , searchCategory)

module.exports = router;
