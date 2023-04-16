
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









exports.deleteHobby = async (req, res) => {


    
}
