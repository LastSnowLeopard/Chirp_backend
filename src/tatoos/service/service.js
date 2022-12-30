const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";







exports.add_taatoo = async function (data) {
  
    const {  color_tone_id,user_id,added_by,img1,img2,img3,img4,img5,tagged_user_id} = data;

    creator_id='';

    if(added_by=='user')  creator_id=tagged_user_id;

    if(added_by=='creator')  creator_id=user_id;

    try {
        var sql = `insert into taatoos (user_id, color_tone_id, image1, image2, image3, image4, image5, added_by,tagged_user_id,creator_id)
            values ('${user_id}','${color_tone_id}','${img1}','${img2}','${img3}','${img4}','${img5}','${added_by}','${tagged_user_id}','${creator_id}') `;
        const [fields] = await dbpool.query(sql)
        console.log(fields.insertId);
        if (fields.affectedRows >= 1) {
            return {message:"taatoots  added Successfully",data:{},status:1}
                }
            else
        {
            return  {message:"Error in data",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};






exports.getTaatoosService = async function (data) {
    try {
        var sql = `select user.full_name,taatoos.* from taatoos 
        left join user on taatoos.creator_id=user.id
         where color_tone_id='${data.color_tone_id}' LIMIT ${data.pageSize} OFFSET ${(data.page-1) * data.pageSize}`;
       console.log(sql);
        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `select count(*) from taatoos where color_tone_id='${data.color_tone_id}'`;
        const [field] = await dbpool.query(sql1);
        console.log("========",field)


            return {message:"data fetcghed",data:fields,total_page:Math.ceil(field[0]['count(*)']/data.pageSize),pageno:data.page,status:1}
                }
            else
        {
            return  {message:"not data fected",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};



exports.getTaatoosByIDService = async function (data) {

    try {
        var sql = `select user.full_name,taatoos.* from taatoos 
        left join user on taatoos.creator_id=user.id
         where taatoos.user_id='${data.id}' AND  taatoos.added_by='${data.added_by}' LIMIT ${data.pageSize} OFFSET ${(data.page-1) * data.pageSize}`;
       console.log(sql);
        var [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `select count(*) as total_records,sum(total_likes) as thumbs_up from taatoos where user_id='${data.id}' AND  taatoos.added_by='${data.added_by}'`;
         var [field] = await dbpool.query(sql1);
      

            return {message:"Data Fetched",data:fields,total_taatoos:field[0]['total_records']  ,total_likes:field[0]['thumbs_up'],total_page:Math.ceil(field[0]['total_records']/data.pageSize),pageno:data.page,status:1}
                }
            else
        {
            return  {message:"not data fected",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};


exports.getTagsTaatoosByIDService = async function (data) {

    try {
        var sql = `select user.full_name,taatoos.* from taatoos 
        left join user on taatoos.creator_id=user.id
        where taatoos.tagged_user_id='${data.id}'  LIMIT ${data.pageSize} OFFSET ${(data.page-1) * data.pageSize}`;
       console.log(sql);
        var [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `select count(*) as total_records from taatoos where tagged_user_id='${data.id}'`;
         var [field] = await dbpool.query(sql1);
    
            return {message:"Data Fetched",data:fields  ,total_page:Math.ceil(field[0]['total_records']/data.pageSize),pageno:data.page,status:1}
                }
            else
        {
            return  {message:"not data fected",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};







exports.getColorCodeService = async function (data) {
  
	
    try {
        var sql = `select id,color_code from color_tone`;
       console.log(sql);
        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

       

            return {message:"data fetcghed",data:fields,status:1}
                }
            else
        {
            return  {message:"not data fected",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};



exports.likeTaatoos_service = async function (taatoo_id) {
  


     const sql =  `update user SET total_likes =total_likes+1 where id = '${taatoo_id}'`;

     const [fields] = await dbpool.query(sql);
     console.log(fields,sql)
     try{
     if(fields.affectedRows>=1){
        return {message:" Updated Successfully",data:{},status:1}

     }
     else {
        return {message:"Not Updated Successfully",data:{},status:0}

     }
 }catch(err)
 {
     return "System Error" 
 }
 };