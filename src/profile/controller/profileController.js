
const profileService=require('../service/service');

const mail = require('../../../helper/mail')

exports.insertUpdateProfileImage = async (req, res) => {

    let userId=req.body.userId;
    let profileId=req.body.profileId;
    let filename=req.body.profile_image;
    let data={
        userId,profileId,filename
    }
    
    try {
        const respond = await profileService.createUpdateService(data);
        console.log("1")
        const response = await profileService.getProfileImgURl(data);
        console.log("2")
        res.status(200).send({ response})     
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message});
    }  
}


exports.deleteProfileImage = async (req, res) => {
    let userId = req.body.userId;
    let profileId = req.body.profileId;
    
    try {
      const response = await profileService.deleteProfileImageService(userId, profileId);
      res.status(200).send({ message: response.message, data: {}, status: response.status });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };


exports.insertUpdateCoverImage = async (req, res) => {

    let userId=req.body.userId;
    let profileId=req.body.profileId;
    let filename=req.body.cover_image;
    let data={
        userId,profileId,filename
    }
    
    try {
        const respond = await profileService.createUpdateCoverImageService(data);
    
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error.message});
    }  
}


exports.deleteCoverImage = async (req, res) => {
    let userId = req.body.userId;
    let profileId = req.body.profileId;
    
    try {
      const response = await profileService.deleteCoverImageService(userId, profileId);
      res.status(200).send({ message: response.message, data: {}, status: response.status });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };


exports.readProfileDataById = async (req, res) => {
    let userId = req.body.userId;
    try {
        const response = await profileService.readProfiledatabyIdService(userId);
        const recent_friends = await profileService.getRecentFriendsbyIdService(userId);
        response.data.recent_friends=recent_friends;
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};






exports.readProfileDataByIdForEditProfile = async (req, res) => {
    let userId = req.body.userId;
    try {
        const response = await profileService.readProfileDataByIdForEditProfileService(userId);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.readProfileDataByIdForEditProfile = async (req, res) => {
    let userId = req.body.userId;
    
    try {
        const response = await profileService.readProfileDataByIdForEditProfileService(userId);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.addBioInProfile = async (req, res) => {
    let userId = req.body.userId;
    let profileId = req.body.profileId;
    let bio = req.body.bio;
    let overview_text_privacy=req.body.overview_text_privacy
    
    try {
        const response = await profileService.addBioInProfileService(userId,profileId,bio,overview_text_privacy);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};





exports.addHobbies = async (req, res) => {
    
    let hobbiesData=req.body.hobbiesData;
    let hobby_deletion_ids=req.body.hobby_deletion_ids;


    try {

        const response = await profileService.addHobbiesInProfileService(hobbiesData);
        if(hobby_deletion_ids.length>0)
         await profileService.deleteHobbiesInProfileService(hobby_deletion_ids);

        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};





exports.getUserHobbies = async (req, res) => {
    let userId = req.body.userId;
 
    
    try {
        const response = await profileService.getHobbyProfileService(userId);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.getFriendsList = async (req, res) => {
    let data={
        page:req.body.page,
        filter:req.body.filter, // all  city country education
        pageSize:req.body.pageSize,
        userId : req.body.userId,
        profileId : req.body.profileId,
    };
    
    try {
        const response = await profileService.getFriendsListService(data);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.addWork = async (req, res) => {
    var { user_id, company, position, city_town, description, currently_working_here, privacy, from_date,to_date } = req.body;
    if(currently_working_here==1)
    { 
        to="Present";
    }
    
    
    try {
        const response = await profileService.addWorkService({ user_id, company, position, city_town, description, currently_working_here, privacy, from_date,to_date });
        if(response>=0)
            res.status(200).send({message:"Work added successfully",status:1,data:{response}});
        else
            res.status(200).send({message:"Work not added successfully",status:0,data:{}});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message,status:0 });
    }  
};

exports.addEducation = async (req, res) => {
    const { user_id, institute_name, from_date, to_date, is_graduated, degree, privacy } = req.body;
    try {
        var response = await profileService.addEducationService({user_id, institute_name, from_date, to_date, is_graduated, degree, privacy});
        if(response>=0)
            res.status(200).send({message:"Education added successfully",status:1,data:{response}});
        else
            res.status(200).send({message:"Education not added successfully",status:0,data:{}});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.updateWork = async (req, res) => {
    var { user_id, company, position, city_town, description, currently_working_here, privacy, from_date, to_date,work_id } = req.body;
    if (currently_working_here == 1) {
        to = "Present";
    }

    try {
        const response = await profileService.updateWorkService({ work_id,user_id, company, position, city_town, description, currently_working_here, privacy, from_date, to_date });
        if (response) {
            res.status(200).send({ message: "Work updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Work not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};

exports.updateEducation = async (req, res) => {
    const { education_id,user_id, institute_name, from_date, to_date, is_graduated, degree, privacy } = req.body;
    try {
        const response = await profileService.updateEducationService({ education_id,user_id, institute_name, from_date, to_date, is_graduated, degree, privacy });
        if (response) {
            res.status(200).send({ message: "Education updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Education not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};


exports.addEvent = async (req, res) => {
    const { user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy } = req.body;
    try {
        var response = await profileService.addEventService({user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy });
        if(response>=0)
            res.status(200).send({message:"Event added successfully",status:1,data:{response}});
        else
            res.status(200).send({message:"Event not added successfully",status:0,data:{}});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};





exports.updatePlaceLived = async (req, res) => {
    const { place_id, user_id, city, latlng, date_moved, privacy } = req.body;
    try {
        const response = await profileService.updatePlaceLivedService({ place_id, user_id, city, latlng, date_moved, privacy });
        if (response) {
            res.status(200).send({ message: "Place lived updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Place lived not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};

exports.updateLanguage = async (req, res) => {
    const { language_id, user_id, language, privacy } = req.body;
    try {
        const response = await profileService.updateLanguageService({ language_id, user_id, language, privacy });
        if (response) {
            res.status(200).send({ message: "Language updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Language not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};

exports.updateEvent = async (req, res) => {
    const { event_id, user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy } = req.body;
    try {
        const response = await profileService.updateEventService({ event_id, user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy });
        if (response) {
            res.status(200).send({ message: "Event updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Event not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};

exports.updateRelationship = async (req, res) => {
    const { family_id, user_id, relationship, relation_person_id, privacy } = req.body;
    try {
        const response = await profileService.updateRelationshipService({ family_id, user_id, relationship, relation_person_id, privacy });
        if (response) {
            res.status(200).send({ message: "Relationship updated successfully", status: 1, data: response });
        } else {
            res.status(200).send({ message: "Relationship not updated successfully", status: 0, data: {} });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message, status: 0 });
    }
};




exports.addPlacedLived = async (req, res) => {
    const { user_id, city, latlng, date_moved, privacy } = req.body;
    try {
        var response = await profileService.addPlacedliveService({user_id, city, latlng, date_moved, privacy});
        if(response>=0)
            res.status(200).send({message:"placed Added added successfully",status:1,data:{response}});
        else
            res.status(200).send({message:"placed not added successfully",status:0,data:{}});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.addRelationShip = async (req, res) => {
    
    const { user_id,relationship,relation_person_id,privacy } = req.body;
    try {
        var response = await profileService.addRelationshipService({user_id,relationship,relation_person_id,privacy});
        if(response>=0)
            res.status(200).send({message:"placed Added added successfully",status:1,data:{response}});
        else
            res.status(200).send({message:"placed not added successfully",status:0,data:{}});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
};


exports.getAboutSection = async (req, res) => {
    const { user_id } = req.body;

    let data={};
    try {
        var education = await profileService.getEducationService({user_id});
        data.education=education;
        var work = await profileService.getworkService({user_id});
        data.work=work;
        var placesLived = await profileService.getPlaceLivedService({user_id});
        data.placesLived=placesLived;
        var RelationShip = await profileService.getRelationshipService({user_id});
        data.RelationShip=RelationShip;
        var EventService = await profileService.getEventsService({user_id});
        data.EventService=EventService;
        var LanguagesService = await profileService.getLanguagesService({user_id});
        data.Languages=LanguagesService;
        var BasicInfoService = await profileService.getbasicInfoService({user_id});
        data.BasicInfo=BasicInfoService;
        var BasicInfoService1 = await profileService.getbasicInfoService1({user_id});
        data.BasicInfo1=BasicInfoService1;



    
        res.status(200).send({message:"About Data data",status:1,data});
       
    } catch (error) {
        console.log(error);
        res.status(200).send({message:"Error in Getting Data",status:0,data:{}});
    }  
};

exports.addLanguage = async (req, res) => {
    // Read input values from req.body
    const { user_id, language, privacy } = req.body;
    try {
      // Call the service function to insert the data
      const response = await profileService.addLanguageService({  user_id, language, privacy });
      // Return a response to the client based on the result
      if (response >= 0) {
        res.status(200).send({ message: "Language added successfully", status: 1, data: { response } });
      } else {
        res.status(200).send({ message: "Language not added successfully", status: 0, data: {} });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

exports.getPhotos = async (req, res) => {
    // Read input values from req.body
    const { user_id,type } = req.body;
    try {
      // Call the service function to insert the data
      const response = await profileService.getPhotoService({  user_id,type});
      // Return a response to the client based on the result
      if (response.length > 0) {
        res.status(200).send({ message: "User Images", status: 1, data:  response  });
      } else {
        res.status(200).send({ message: "no Data found", status: 0, data: {} });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };

  
exports.getvideos = async (req, res) => {
    // Read input values from req.body
    const { user_id,type } = req.body;
    try {
      // Call the service function to insert the data
      const response = await profileService.getvideoService({  user_id,type });
      // Return a response to the client based on the result
      if (response.length > 0) {
        res.status(200).send({ message: "Data Media", status: 1, data: { response } });
      } else {
        res.status(200).send({ message: "No Data Found", status: 0, data: {} });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  };
