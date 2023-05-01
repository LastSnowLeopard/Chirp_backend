const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.addHobbyInListService= async ( hobby,hobby_icon_url) => {
  try {
    var sql1 = `INSERT INTO hobby_list ( hobby_name,hobby_icon_url) VALUES ('${hobby}','${hobby_icon_url}')`;
    const [data] = await dbpool.query(sql1);  
    if(data.affectedRows>0){
      return {message:"Hobby inserted",data:{user_id:""},status:1}
    }else{
      return {message:"",data:{user_id:""},status:0}
    }

  } catch (error) {
    throw error;
  }
}



exports.creatbackgroundMedia= async ( query) => {
  try {
    const [data] = await dbpool.query(query);  
    if(data.affectedRows>0){
      return {message:"Background inserted",data:{user_id:""},status:1}
    }else{
      return {message:"",data:{user_id:""},status:0}
    }

  } catch (error) {
    throw error;
  }
}



exports.getHobbyListService = async () => {
  try {
    var sql1 = `select * from hobby_list`;
    const [data] = await dbpool.query(sql1);  
    if(data.length>0){
      return {message:"Data List Found",data:data,status:1}
    }else{
      return {message:"",data:{user_id:""},status:0}
    }

} catch (error) {
  throw error;
}


}


exports.getEventListService = async () => {
  try {
    var sql1 = `select * from event_list`;
    const [data] = await dbpool.query(sql1);  
    if(data.length>0){
      return {message:"Data List Found",data:data,status:1}
    }else{
      return {message:"",data:{user_id:""},status:0}
    }

} catch (error) {
  throw error;
}
}

exports.getPOstBackgroundListService = async () => {
  try {
    var sql1 = `select * from post_backgrounds `;
    const [data] = await dbpool.query(sql1);  
    if(data.length>0){
      return {message:"Data List Found",data:data,status:1}
    }else{
      return {message:"no data found",data:{},status:0}
    }

} catch (error) {
  throw error;
}
}

exports.getFeelingListService = async () => {
  try {
    var sql1 = `select * from feelings_list`;
    const [data] = await dbpool.query(sql1);  
    if(data.length>0){
      return {message:"Data List Found",data:data,status:1}
    }else{
      return {message:"",data:{user_id:""},status:0}
    }

} catch (error) {
  throw error;
}


}




