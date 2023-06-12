const express = require('express');
const multer = require('multer');
const postController = require('./controller/controller');
const saveMediaFiles = require('./../../helper/postmedia');

const router = express.Router();
const upload = multer();

const uploadStory= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

router.post('/upload-story',uploadStory.fields([{name: 'story_media'},{name: 'thumb_nail_url'}]),postController.uploadStory);
router.post('/read-stories',postController.readStories)
router.post('/delete-story',postController.deleteStory);


router.post('/create-post',  saveMediaFiles.uploadFiles, postController.createPost);
router.post('/update-post',  saveMediaFiles.uploadFiles, postController.UpdatePost);
router.post('/get-post-by-id',   postController.getPostById);
router.post('/like-post',postController.likePost)
router.post('/share-post',postController.SharePost)
router.post('/get-post-details-by-shareablelink',postController.getPostbyShareableLink)
router.post('/delete-post',postController.deletePost)
router.post('/get-friends-by-userid',postController.getUsrFriendsByUserid);
router.post('/create-comments',postController.createComments);
router.post('/create-replies',postController.createReplies);
router.post('/update-comments',postController.updateComments);
router.post('/update-replies',postController.updateReplies);
router.post('/delete-comments',postController.deleteComments);
router.post('/delete-replies',postController.deleteReplies);

router.post('/get-newsfeeds',postController.searchNewsFeed);

router.post('/send-friend-request',postController.SendFriendRequest);
router.post('/accept-friend-request',postController.AcceptFriendRequest);

router.post('/get-friend-requests-list',postController.getFriendRequestList);

router.post('/search-people',postController.searchPeople);

router.post('/read-notification',postController.readNotification);


module.exports = router;


