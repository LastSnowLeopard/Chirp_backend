
const authService=require('../service/service');




const mail = require('../../../helper/mail')
exports.addTatoo = async (req, res) => {

    let color_tone_id=req.body.color_tone_id;;
    let user_id=req.body.user_id;
    let added_by=req.body.account_type;
    let tagged_user_id=req.body.tagged_user_id;

    let img1=req.body.img1 || "";
    let img2=req.body.img2 || "";
    let img3=req.body.img3|| "";
    let img4=req.body.img4|| "";
    let img5=req.body.img5|| "";

    // let created_at=new Date().toISOString();
    // let updated_at=new Date().toISOString();
  
    let tattoo_data={
        color_tone_id,user_id,added_by,img1,img2,img3,img4,img5,tagged_user_id
    }
    
    try {
        const respond = await authService.add_taatoo(tattoo_data);
       
      
        
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
        res.status(400).send({message:error.message});
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
        res.status(400).send({message:error.message});
    }
}




exports.likeTaatoos = async (req, res) => {
    let taatoo_id=req.body.taatoo_id;

try {
    const respond = await authService.likeTaatoos_service(taatoo_id);
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

    try{
        const respond = await authService.getstats();
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
        res.status(400).send({message:error.message});
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


