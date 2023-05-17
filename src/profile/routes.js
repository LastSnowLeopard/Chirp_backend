const express = require("express")
const route = express.Router()

const profileController = require('./controller/profileController') 
const upload= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/insert-update-profile-image',upload.fields([{name: 'profile_image'}]),profileController.insertUpdateProfileImage)
route.delete('/delete-profile-image', profileController.deleteProfileImage);

route.post('/insert-update-cover-image',upload.fields([{name: 'cover_image'}]),profileController.insertUpdateCoverImage)
route.delete('/delete-cover-image', profileController.deleteCoverImage);

route.post('/read-profile-data-by-id', profileController.readProfileDataById);

route.post('/read-profile-data-by-id-for-edit-profile', profileController.readProfileDataByIdForEditProfile);

route.post('/add-bio-in-profile', profileController.addBioInProfile);



route.post('/add-user-hobbies', profileController.addHobbies);

route.post('/get-user-hobbies', profileController.getUserHobbies);

route.post('/get-friends-list', profileController.getFriendsList);

route.post('/add-work', profileController.addWork);

route.post('/add-education', profileController.addEducation);

// Add route for updating work
route.post('/update-work', profileController.updateWork);

// Add route for updating education
route.post('/update-education', profileController.updateEducation);

// Add route for updating places lived
route.post('/update-place-lived', profileController.updatePlaceLived);

// Add route for updating languages
route.post('/update-language', profileController.updateLanguage);

// Add route for updating life events
route.post('/update-event', profileController.updateEvent);

// Add route for updating family relationships
route.post('/update-relation', profileController.updateRelationship);



route.post('/add-event', profileController.addEvent);

route.post('/place-lived', profileController.addPlacedLived);

route.post('/add-relation', profileController.addRelationShip);

route.post('/add-language', profileController.addLanguage);

route.post('/get-about-section', profileController.getAboutSection);
route.post('/get-photos', profileController.getPhotos);
route.post('/get-videos', profileController.getvideos);




module.exports = route
