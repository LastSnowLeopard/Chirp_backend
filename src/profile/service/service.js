const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.createUpdateService = async function (data) {
    const { userId,profileId,filename } = data;

    let update=`UPDATE profiles SET profile_image_url = '${filename}' WHERE user_id = ${userId} AND profile_id=${profileId}`;
    try {
        if(profileId=="" || profileId==null || profileId==undefined ){
            return  {message:"Error in data",data:{},status:0 }

        }else{
            const [fields] = await dbpool.query(update)
            if (fields.affectedRows >= 1) {
                return {message:"Profile Image updated Successfully",data:{},status:1}
                    }
                else
            {
                return  {message:"Error in data",data:{},status:0 }
            }
        }     
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};


exports.deleteProfileImageService = async function (userId, profileId) {
    let query = `UPDATE profiles SET profile_image_url = null WHERE user_id = ${userId} AND profile_id = ${profileId}`;
  
    try {
      const [fields] = await dbpool.query(query);
      
      if (fields.affectedRows >= 1) {
        return { message: "Profile image deleted successfully", status: 1 };
      } else {
        return { message: "Error in data", status: 0 };
      }
    } catch (err) {
      console.error(err);
      return err + "System Error";
    }
  };




  
exports.createUpdateCoverImageService = async function (data) {
    const { userId,profileId,filename } = data;

    let update=`UPDATE profiles SET cover_photo_url = '${filename}' WHERE user_id = ${userId} AND profile_id=${profileId}`;
    try {
        if(profileId=="" || profileId==null || profileId==undefined ){
            return  {message:"Error in data",data:{},status:0 }

        }else{
            const [fields] = await dbpool.query(update)
            if (fields.affectedRows >= 1) {
                return {message:"Cover updated Successfully",data:{},status:1}
                    }
                else
            {
                return  {message:"Error in data",data:{},status:0 }
            }
        }     
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};



exports.deleteCoverImageService = async function (userId, profileId) {
    let query = `UPDATE profiles SET cover_photo_url = null WHERE user_id = ${userId} AND profile_id = ${profileId}`;
  
    try {
      const [fields] = await dbpool.query(query);
      
      if (fields.affectedRows >= 1) {
        return { message: "Cover image deleted successfully", status: 1 };
      } else {
        return { message: "Error in data", status: 0 };
      }
    } catch (err) {
      console.error(err);
      return err + "System Error";
    }
  };




  
exports.readProfiledatabyIdService = async function (userId) {
    try {
        const [rows] = await dbpool.query(
            `SELECT p.*, (SELECT COUNT(*) FROM friends WHERE user_id = p.user_id) AS total_friends
            FROM profiles p
            WHERE user_id = ${userId};`
        );
        
        if (rows.length > 0) {

            return { message: "Profile Found", data: rows[0], status: 1 };

        } else {
            return { message: "Profile data not Found", data: "", status: 0 };

        }
    } catch (error) {
        console.error(error);
        throw new Error("System error");
    }
};




exports.readProfileDataByIdForEditProfileService = async function (userId) {
    try {
        const [rows] = await dbpool.query(
            `SELECT 
               profile_id, user_id, profile_image_url, cover_photo_url, overview_text as bio, lives_in, marital_status, country, followed_by, created_at, updated_at from profiles
            WHERE user_id = ${userId};`
        );
        
        if (rows.length > 0) {

            const [rows1] = await dbpool.query(
                `SELECT *
                FROM user_hobbies 
                inner join hobby_list on user_hobbies.public_hobby_id=hobby_list.hobby_id
                WHERE user_id = ${userId};`
            );
            
            const [jobs] = await dbpool.query(
                'SELECT work_id, user_id, company, position, city_town, `from`, `to`, description, currently_working_here, privacy, created_at, updated_at FROM work WHERE user_id='+userId
            );
            
            const [education] = await dbpool.query(
                'select education_id, user_id, college, `from`, `to`, graduated, concentration1, concentration2, concentration3, attended_for, degree, privacy, created_at, updated_at, education_level FROM education WHERE user_id= '+userId
            );


            
            return { message: "Profile Found", data: {"profile_data":rows[0],"user_hobbies":rows1,"user_education":education,"user_jobs":jobs }, status: 1 };

        } else {
            return { message: "Profile data not Found", data: "", status: 0 };

        }
    } catch (error) {
        console.error(error);
        throw new Error("System error");
    }
};







exports.addBioInProfileService = async function (userId,profileId,bio,overview_text_privacy) {
    let query = `UPDATE profiles SET overview_text ='${bio}',overview_text_privacy='${overview_text_privacy}' WHERE user_id = ${userId} AND profile_id = ${profileId}`;
  
    try {
      const [fields] = await dbpool.query(query);
      
      if (fields.affectedRows >= 1) {
        return { message: "Update Bio successfully", status: 1 };
      } else {
        return { message: "Error in data", status: 0 };
      }
    } catch (err) {
      console.error(err);
      return err + "System Error";
    }
}




exports.addHobbiesInProfileService = async function (data) {

    let query=``;

     try {
        for (const item of data) {
            const { userId, public_hobby_id, hobby_name } = item;
    
            query =  `INSERT INTO user_hobbies (user_id, public_hobby_id, hobby_name)
            SELECT ${userId}, ${public_hobby_id}, '${hobby_name}'
            WHERE NOT EXISTS (SELECT 1 FROM user_hobbies WHERE user_id = ${userId} AND public_hobby_id = ${public_hobby_id});
            `
            await dbpool.query(query);
    
        }
        

      if ( true) {
        return { message: "Hobbies inserted", status: 1 };
      } else {
        return { message: "Error in data", status: 0 };
      }
    } catch (err) {
      console.error(err);
      return err + "System Error";
    }
}



exports.deleteHobbiesInProfileService = async function (data) {
    let query=``;

    try {
     
        
           query =  `Delete from user_hobbies 
           WHERE hobby_id IN (${data})
           `
           const [] =await dbpool.query(query);

            return 1;
    } catch (err) {
        console.error(err);
        return err + "System Error";
    }

}


exports.getHobbyProfileService = async function (user_id) {
  
    try {

      
       
        const [data] = await dbpool.query(`SELECT * FROM user_hobbies WHERE user_id = ${user_id}`)
    
        if (data.length >= 0) {
            return {message:"hobbies list of user",data:{hobbies:data},status:1}
        }
                
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};


exports.getFriendsListService = async function (data) {

    let query=``;
    if(data.filter == "all"){
        query=``;
    }

    

    try {
        var sql = `SELECT friends.user_id as id, friends.friend_user_id as friend_id, users.full_name,profiles.profile_image_url 
        FROM friends LEFT JOIN users on friends.friend_user_id=users.user_id LEFT JOIN profiles on friends.friend_user_id=profiles.user_id 
        WHERE friends.status="accepted" and friends.user_id=${data.userId} LIMIT ${data.pageSize} OFFSET ${(data.page-1) * data.pageSize}`;
       console.log(sql);
        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `SELECT count(*) FROM friends LEFT JOIN users on friends.friend_user_id=users.user_id LEFT JOIN profiles on friends.friend_user_id=profiles.user_id 
         WHERE friends.status="accepted" and friends.user_id=${data.userId}`;
        const [field] = await dbpool.query(sql1);
            return {message:"data fetched",data:fields,total_page:Math.ceil(field[0]['count(*)']/data.pageSize),pageno:data.page,status:1}
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



exports.archived_taatoo = async function (query) {
  
    try {
        console.log(query)
       
        const [fields] = await dbpool.query(query)
        console.log(fields.insertId);
        if (fields.affectedRows >= 1) {
            return {message:"taatoots  archived Successfully",data:{},status:1}
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


exports.getTaatoosdetailByIdService = async function (data) {

    try {
        var sql = `SELECT 
        taatoos.*, 
        CASE 
          WHEN like_record.user_id = ${data.user_id} THEN 1 
          ELSE 0 
        END AS is_liked 
      FROM 
        taatoos 
        LEFT JOIN like_record 
          ON taatoos.id = like_record.taatoo_id 
      WHERE 
        taatoos.id=${data.id}
      `;
       console.log(sql);
        var [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {
            return {message:"Data Fetched",data:fields,status:1}
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
        var sql = `select id,color_code,color_name,color_discription,color_in_use from color_tone`;
       console.log(sql);
        const [fields] = await dbpool.query(sql)
     

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

exports.getstats = async function (qu,dates) {
  
	let data={
        total_user:'',
        total_creator:'',
        total_tatoos:''
    }
    let que1=``;
    let que2=``;
    if(dates==0){
        que1=``;
        que2=``;
    }else{
        que1=`AND created_at > '${qu}'`;
        que2=`where created_at > '${qu}'`;
    }

    try {
        var sql = `select count(*) as total_user from user where account_type='user' ${que1}`;
         console.log(sql);
        var [fields] = await dbpool.query(sql)
        console.log(fields[0].total_user);
        data.total_user=fields[0].total_user;
        var sql = `select count(*) as total_creator from user where account_type='creator' ${que1}`;
        console.log(sql);
         [fields] = await dbpool.query(sql)
        console.log(fields[0].total_creator);
        data.total_creator=fields[0].total_creator;

        var sql = `select count(*) as total_tattoos from taatoos   ${que2}`;
        console.log(sql);
         [fields] = await dbpool.query(sql)
        console.log(fields[0].total_tattoos);
        data.total_tatoos=fields[0].total_tattoos

        if (data) {

            return {message:"data fetched",data:data,status:1}
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


exports.getUsersService = async function (page_numer,user_type) {
  let page_size=15;
    try {
        var sql = `select * from user where account_type='${user_type}' LIMIT ${page_size} OFFSET ${(page_numer-1) * page_size}`;
        var [fields] = await dbpool.query(sql)
       
        if (fields.length>0) {
            var sql1 = `select count(*) from user where account_type='${user_type}'`;
            var [field] = await dbpool.query(sql1);
            return {message:"data fetched",data:fields,total_page:Math.ceil(field[0]['count(*)']/page_size),pageno:page_numer,status:1}
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

exports.getCreatorService = async function (page_numer,user_type) {
    let page_size=15
    try {
        var sql = `select user.*,creator.buiness_email, creator.business_name,
                  creator.profile_image, creator.cover_image, creator.contact_number, creator.no_of_followers from user inner join creator on creator.user_id = user.id where account_type='creator' LIMIT ${page_size} OFFSET ${(page_numer-1) * page_size}`;
         console.log(sql);
        var [fields] = await dbpool.query(sql)
        if (fields.length>0) {
            var sql1 = `select count(*) from user inner join creator on creator.user_id = user.id where account_type='creator' `;
            console.log(sql);
            var [field] = await dbpool.query(sql1)

            return {message:"data fetched",data:fields,total_page:Math.ceil(field[0]['count(*)']/page_size),pageno:page_numer,status:1}
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




exports.likeTaatoos_service = async function (taatoo_id,user_id) {
    
    var sql = `SELECT * FROM like_record WHERE user_id='${user_id}'  AND taatoo_id='${taatoo_id}'`;
  console.log(sql);
   var [fields] = await dbpool.query(sql)
   console.log(fields);

   if (fields.length >= 0) {



    const sqllll =  `delete from like_record  WHERE user_id='${user_id}'  AND taatoo_id='${taatoo_id}'`;
    console.log(sqllll)
    const [fieldss] = await dbpool.query(sqllll);
    console.log(fieldss,sqllll)
    if(fieldss.affectedRows>=1){
      
                    const sql =  `update taatoos SET total_likes =total_likes-1 where id = ${taatoo_id}`;
                    console.log(sql)
                    const [fields] = await dbpool.query(sql);
                    console.log(fields,sql)
                    try{
                    if(fields.affectedRows>=1){
                        return {message:"disliked",data:{},status:1}

                    }
                    else {
                        return {message:"failed",data:{},status:0}

                    }
                    }catch(err)
                    {
                        return "System Error" 
                    }


    }
    else {

                    const sqllll =  `INSERT INTO like_record( user_id, taatoo_id) VALUES ('${user_id}','${taatoo_id}')`;
                    console.log(sqllll)
                    const [fieldss] = await dbpool.query(sqllll);
                    console.log(fieldss,sqllll)
                    if(fieldss.affectedRows>=1){
      
                        const sql1 =  `update taatoos SET total_likes =total_likes+1 where id = ${taatoo_id}`;
                        console.log(sql1)
                        const [fields1] = await dbpool.query(sql1);
                        console.log(fields1,sql1)
                        try{
                            if(fields1.affectedRows>=1){
                                return {message:"liked",data:{},status:1}

                            }
                            else {
                                return {message:"failed",data:{},status:0}

                            }
                        }catch(err)
                        {
                            return "System Error" 
                        }

                }else{

                    return {message:"failed",data:{},status:0}
                }
    }
         

           }
          

 };



exports.WriteCommentsService = async function (obj) {

const query = `INSERT INTO comments (taatoo_id, added_by, comment, user_id)
VALUES (${obj.tattoo_id}, '${obj.added_by}', '${obj.comment}', ${obj.user_id})`;

    try {
       
        const [fields] = await dbpool.query(query)
        console.log(fields.insertId);
        if (fields.affectedRows >= 1) {
            return {message:"Comment Inserted",data:{},status:1}
                }
            else
        {
            return  {message:"Insertion Failed",data:{},status:0 }
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};



exports.ReadCommentsService = async function (taatoo_id) {

    try {
        var sql = `select * from comments
         where taatoo_id='${taatoo_id}'`;
       console.log(sql);
        var [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {
            return {message:"Data Fetched",data:fields,status:1}
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
