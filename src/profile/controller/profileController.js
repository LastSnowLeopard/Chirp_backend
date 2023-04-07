
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







exports.archiveTatoo = async (req, res) => {
    let tatoo_id=req.body.tatoo_id;

    let img1=req.body.img1 || "";
    let img2=req.body.img2 || "";
    let img3=req.body.img3|| "";
    let img4=req.body.img4|| "";
    let img5=req.body.img5|| "";
    let archied_at=req.body.archived_at|| "";
    



    if(img1 =="" && img2 =="" && img3 =="" && img4 =="" && img5 =="" ){
        res.status(400).send({message:"no image provided"});
    }
    //settig name
    let query=``;
 

 
    try {

        if(img1 !="" && img2 =="" && img3 =="" && img4 =="" && img5 =="" ){
            query=`update taatoos set image1='${img1}',image_1_archived='${archied_at}' where id=${tatoo_id}`
            console.log("1")
        }
    
        if(img1 =="" && img2 !="" && img3 =="" && img4 =="" && img5 =="" ){
            query=`update taatoos set image2='${img2}',image_2_archived='${archied_at}' where id=${tatoo_id}`
            console.log("2")
        }
    
        if(img1 =="" && img2 =="" && img3 !="" && img4 =="" && img5 =="" ){
            query=`update taatoos set image3='${img3}',image_3_archived='${archied_at}' where id=${tatoo_id}`
            console.log("3")
        }
    
        if(img1 =="" && img2 =="" && img3 =="" && img4 !="" && img5 =="" ){
            query=`update taatoos set image4='${img4}',image_4_archived='${archied_at}' where id=${tatoo_id}`
            console.log("4")
        }
    
        if(img1 =="" && img2 =="" && img3 =="" && img4 =="" && img5 !="" ){
            query=`update taatoos set image5='${img5}',image_5_archived='${archied_at}' where id=${tatoo_id}`
            console.log("4")
        }
    
        const respond = await authService.archived_taatoo(query);
               
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}

exports.getTaatoos = async (req, res) => {

    let data={
        page:req.body.page,
        color_tone_id:req.body.color_tone_id,
        key_word:req.body.key_word,
        pageSize:req.body.pageSize
    };

    try{
        const respond = await authService.getTaatoosService(data);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:error.message});
    }
}

exports.getTaatoosById = async (req, res) => {

    let data={
        id:req.body.id,
        page:req.body.page,
        pageSize:req.body.pageSize,
        added_by:req.body.user_type
    };

    try{
        const respond = await authService.getTaatoosByIDService(data);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}


exports.getTaatoosdetailById = async (req, res) => {

    let data={
        id:req.body.id,
        user_id:req.body.user_id
    };

    try{
        const respond = await authService.getTaatoosdetailByIdService(data);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}



exports.getTaggedTaatoosById = async (req, res) => {

    let data={
        id:req.body.id,
        page:req.body.page,
        pageSize:req.body.pageSize,
        added_by:req.body.user_type
    };

    try{
        const respond = await authService.getTagsTaatoosByIDService(data);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}




exports.likeTaatoos = async (req, res) => {
    let taatoo_id=req.body.taatoo_id;
    let user_id=req.body.user_id;

try {
    const respond = await authService.likeTaatoos_service(taatoo_id,user_id);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}



exports.getColorCode = async (req, res) => {

    try{
        const respond = await authService.getColorCodeService();
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:error.message});
    }
}


exports.getstats = async (req, res) => {
    let dates=req.query.dates;
    console.log(dates);

    // var today = new Date();
    // var dd = String(today.getDate()-dates).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;


    var d = new Date();
     d.setDate(d.getDate()-dates);
     var dd = String(d.getDate());
     var mm = String(d.getMonth() + 1); //January is 0!
     var yyyy = d.getFullYear();
     var today=yyyy+"/"+mm+"/"+dd;


    let qu=`'${today}'`;
    if(dates==0){
        qu=``;  
    }else{
        qu=`${today}`
    }

    try{
        const respond = await authService.getstats(qu,dates);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}

exports.getUsers = async (req, res) => {
    
    try{
        const respond = await authService.getUsersService(req.query.page,req.query.account_type);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}



exports.getCreator = async (req, res) => {

    try{
        const respond = await authService.getCreatorService(req.query.page,req.query.account_type);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}


exports.ReadComments = async (req, res) => {

    try{
        const respond = await authService.ReadCommentsService(req.body.tattoo_id);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}

exports.WriteComments = async (req, res) => {

    const obj = {
        tattoo_id: req.body.tattoo_id,
        added_by: req.body.added_by, //user,creator
        comment: req.body.comment,
        user_id: req.body.user_id
      };

    try{
        const respond = await authService.WriteCommentsService(obj);
        res.status(200).send({ respond})     
    }catch(err){
        res.status(400).send({message:err.message});
    }
}


