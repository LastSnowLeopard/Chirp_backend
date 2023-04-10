
const hobbyService=require('../service/service');
const mail = require('../../../helper/mail')

exports.addHobbyInList = async (req, res) => {
  try {
    const { hobby,hobby_icon_url } = req.body;

    const result = await hobbyService.addHobbyInListService( hobby,hobby_icon_url);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


exports.getHobbyList = async (req, res) => {
  try {


    const result = await hobbyService.getHobbyListService();

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

    
}



exports.deleteHobby = async (req, res) => {


    
}
