var express = require('express');
var router = express.Router();
var userAuth = require('../middleware/auth')
var likesCommentsController = require('../controller/likes_comments_controller')

router.post('/likes/:title_id',userAuth,likesCommentsController.likes )
// router.put('/dislikes/:_id',userAuth,likesCommentsController.dislikes )
// router.post('/comment/:_id',userAuth,likesCommentsController.comment )


module.exports = router