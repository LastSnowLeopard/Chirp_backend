
const Service=require('../service/service');
const mail = require('../../../helper/mail')

exports.addHobbyInList = async (req, res) => {
  try {
    const { hobby,hobby_icon_url } = req.body;

    const result = await Service.addHobbyInListService( hobby,hobby_icon_url);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


exports.getHobbyList = async (req, res) => {
  try {
    const result = await Service.getHobbyListService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


exports.getEventList = async (req, res) => {
  try {
    const result = await Service.getEventListService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


exports.getFeelingList = async (req, res) => {
  try {
    const result = await Service.getFeelingListService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

exports.getPOstBackgroundList= async (req, res) => {
  try {
    const result = await Service.getPOstBackgroundListService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}



exports.addbackgrounds = async (req, res) => {

  let media=[];
  let background_type=req.body.background_type || "";    //image or color
  let color_code=req.body.color_code || "";


  const filenames = req.files.map(file => {    
    media.push({"media_name":file.originalname,"media_type":file.mimetype.split('/')[0]}) ;
  }    
);

// create Post
   
    try {
        if ((media.length > 0)) {

          let media_query = `INSERT INTO post_backgrounds(background_type, color_code, image_url) VALUES ${media.map((m, index) => `( '${background_type}', '${color_code}', '${m.media_name}')`).join(',')};`;
         let  create_media_id = await Service.creatbackgroundMedia(media_query);
          res.status(200).send({message:"background Created Successfully",backgroundid:create_media_id,status: 1});
        } else {
          res.status(200).send({message:"background not Created Successfully",backgroundid:create_media_id,status: 1});
        }
        
            
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error,status:0});
    }  
}










exports.deleteHobby = async (req, res) => {


    
}
