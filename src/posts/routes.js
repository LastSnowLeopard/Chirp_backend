const express = require('express');
const multer = require('multer');
const postController = require('./controller/controller');
const saveMediaFiles = require('./../../helper/postmedia');

const router = express.Router();
const upload = multer();

router.post('/create-post',  saveMediaFiles.uploadFiles, postController.createPost);
router.post('/get-post-by-id',   postController.getPostById);
router.post('/like-post',postController.likePost)
router.post('/share-post',postController.SharePost)
router.post('/get-post-details-by-shareablelink',postController.getPostbyShareableLink)
router.post('/delete-post',postController.deletePost)
router.post('/get-friends-by-userid',postController.getUsrFriendsByUserid);
router.post('/create-comments',postController.createComments);
router.post('/create-replies',postController.createReplies);
module.exports = router;


