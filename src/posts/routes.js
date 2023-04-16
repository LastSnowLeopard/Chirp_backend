const express = require('express');
const multer = require('multer');
const postController = require('./controller/controller');
const saveMediaFiles = require('./../../helper/postmedia');

const router = express.Router();
const upload = multer();

router.post('/create-post',  saveMediaFiles.uploadFiles, postController.createPost);
router.post('/get-post-by-id',   postController.getPostById);
router.post('/like-post',postController.likePost)



module.exports = router;
