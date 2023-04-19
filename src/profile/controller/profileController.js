
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
    
        res.status(200).send({ respond})     
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