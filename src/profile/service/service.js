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





exports.getProfileImgURl = async function (data) {
    try {
        const [rows] = await dbpool.query(
            `SELECT profile_image_url FROM profiles WHERE user_id='${data.userId}' AND profile_id='${data.profileId}'`
        );
        
        if (rows.length > 0) {

            return {message:"Profile Image updated Successfully",data:{profile_image_url:rows[0]['profile_image_url']},status:1}

        } else {
            return {message:"Profile Image not updated Successfully",data:{},status:0}

        }
    } catch (error) {
        console.error(error);
        throw new Error("System error");
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


exports.getRecentFriendsbyIdService = async function (userId) {
    try {
        const [rows] = await dbpool.query(
            `SELECT friends.friend_id as id,users.full_name,profiles.profile_image_url,profiles.cover_photo_url FROM friends 
            LEFT JOIN users ON users.user_id=friends.friend_user_id
            LEFT JOIN profiles ON profiles.user_id=friends.friend_user_id
            WHERE friends.user_id='${userId}'
            ORDER by friends.friend_id DESC LIMIT 10;`
        );
        
        if (rows.length > 0) {

            return rows;

        } else {
            return rows;

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
            const [placesLived] = await dbpool.query(
                'select * from places_lived WHERE user_id= '+userId
            );

            
            return { message: "Profile Found", data: {"profile_data":rows[0],"user_hobbies":rows1,"user_education":education,"user_jobs":jobs,"places_lived":placesLived }, status: 1 };

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

      
       
        const [data] = await dbpool.query(`SELECT user_hobbies.*,hobby_list.hobby_icon_url
         FROM user_hobbies
         left join hobby_list on user_hobbies.public_hobby_id=hobby_list.hobby_id
         WHERE user_hobbies.user_id = ${user_id}`)
    
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

exports.addWorkService = async function (data) {
    var { user_id, company, position, city_town, description, currently_working_here, privacy, from_date,to_date } = data;
    const query = `INSERT INTO work (user_id, company, position, city_town, description, currently_working_here, privacy, \`from\`, \`to\`) VALUES (${user_id}, '${company}', '${position}', '${city_town}', '${description}', ${currently_working_here}, '${privacy}', '${from_date}', '${to_date}')`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    console.log(fields.insertId);
    return fields.insertId;


}

exports.updateWorkService = async function (data) {
    var { work_id,user_id, company, position, city_town, description, currently_working_here, privacy, from_date, to_date } = data;
    const query = `UPDATE work SET company='${company}', position='${position}', city_town='${city_town}', description='${description}', currently_working_here=${currently_working_here}, privacy='${privacy}', \`from\`='${from_date}', \`to\`='${to_date}'
     WHERE user_id=${user_id} and work_id='${work_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);

    return fields.affectedRows > 0;
}

exports.updateEducationService = async function (data) {
    const { education_id,user_id, institute_name, from_date, to_date, is_graduated, degree, privacy } = data;
    const query = `UPDATE education SET college='${institute_name}', \`from\`='${from_date}', \`to\`='${to_date}', graduated=${is_graduated}, degree='${degree}', privacy='${privacy}' WHERE user_id=${user_id} AND education_id='${education_id}'` ;
    console.log(query);
    const [fields] = await dbpool.query(query);

    return fields.affectedRows > 0;
}

exports.updatePlaceLivedService = async function (data) {
    const { place_id, user_id, city, latlng, date_moved, privacy } = data;
    const query = `UPDATE places_lived SET user_id = ${user_id}, city = '${city}', latlng = '${latlng}', date_moved = '${date_moved}', privacy = '${privacy}' WHERE place_id = ${place_id}`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    console.log(fields.affectedRows);
    return fields.affectedRows > 0;
};

exports.updateLanguageService = async function (data) {
    const { language_id, user_id, language, privacy } = data;
    const query = `UPDATE languages SET user_id = '${user_id}', language = '${language}', privacy = '${privacy}' WHERE language_id = ${language_id}`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    console.log(fields.affectedRows);
    return fields.affectedRows > 0;
};

exports.updateEventService = async function (data) {
    const { event_id, user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy } = data;
    const query = `UPDATE posts SET user_id = '${user_id}', content = '${content}', location = '${location}', location_lat_lng = '${location_lat_lng}', post_type = '${post_type}', life_event_id = '${life_event_id}', event_date = '${event_date}', privacy = '${privacy}' WHERE event_id = ${event_id}`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    console.log(fields.affectedRows);
    return fields.affectedRows > 0;
};

exports.updateRelationshipService = async function (data) {
    const { family_id, user_id, relationship, relation_person_id, privacy } = data;
    const query = `UPDATE family SET user_id = ${user_id}, relationship = '${relationship}', relation_person_id = '${relation_person_id}', privacy = '${privacy}' WHERE family_id = ${family_id}`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    console.log(fields.affectedRows);
    return fields.affectedRows > 0;
};

exports.addEducationService = async function (data) {
const {user_id, institute_name, from_date, to_date, is_graduated, degree, privacy}=data;
const query = `INSERT INTO education (user_id, college, \`from\`, \`to\`, graduated, degree, privacy) VALUES (${user_id}, '${institute_name}', '${from_date}', '${to_date}', ${is_graduated}, '${degree}', '${privacy}')`;
console.log(query);
const [fields] = await dbpool.query(query);

console.log(fields.insertId);
return fields.insertId;

}

exports.addRelationshipService = async function (data) {
    const { user_id,relationship,relation_person_id,privacy}=data;
    const query = `INSERT INTO family (user_id, relationship, relation_person_id, privacy) VALUES (${user_id}, '${relationship}', '${relation_person_id}', '${privacy}')`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    console.log(fields.insertId);
    return fields.insertId;
    
    }

exports.addPlacedliveService = async function (data) {
    const {user_id, city, latlng, date_moved, privacy}=data;
    const query = `INSERT INTO places_lived (user_id, city, latlng, date_moved, privacy) VALUES (${user_id}, '${city}', '${latlng}', '${date_moved}', '${privacy}')`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    console.log(fields.insertId);
    return fields.insertId;
    
    }

exports.addEventService = async function (data) {
    const {user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy }=data;
    const query = `INSERT INTO posts (user_id, content, location, location_lat_lng, post_type, life_event_id, event_date, privacy)
     VALUES ('${user_id}', '${content}', '${location}', '${location_lat_lng}', '${post_type}', '${life_event_id}', '${event_date}', '${privacy}')`;

    console.log(query);
    const [fields] = await dbpool.query(query);
    
    console.log(fields.insertId);
    return fields.insertId;
    
    }

exports.addLanguageService = async function (data) {
    const { user_id, language, privacy } = data;
    const query = `INSERT INTO languages ( user_id, language, proficiency, privacy) VALUES ( '${user_id}', '${language}', 'beginner', '${privacy}')`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    console.log(fields.insertId);
    return fields.insertId;
    };

exports.getEducationService = async function (data) {
    const {user_id}=data;
    const query = `select * from education where user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }

exports.getworkService = async function (data) {
        const {user_id}=data;
        const query = `select * from work where user_id='${user_id}'`;
        console.log(query);
        const [fields] = await dbpool.query(query);
        
        return fields;
        
   }
        
exports.getPlaceLivedService = async function (data) {
    const {user_id}=data;
    const query = `select * from places_lived where user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }
         
exports.getRelationshipService = async function (data) {
    const {user_id}=data;
    const query = `select family.user_id,
    family.relationship,
    family.relation_person_id,
    family.privacy,
    family.created_at,
    users.full_name,
    profiles.profile_image_url
    from family
    left join users on family.relation_person_id=users.user_id
    left join profiles on family.relation_person_id=profiles.user_id
    where family.user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }
exports.getEventsService = async function (data) {
    const {user_id}=data;
    const query = `SELECT posts.post_id,posts.content,posts.user_id,posts.life_event_id,posts.created_at,posts.updated_at,posts.post_type,
    event_list.event_name,event_list.event_icon_url
    FROM posts 
    INNER JOIN event_list on posts.life_event_id=event_list.event_id
    WHERE posts.user_id=${user_id} AND posts.post_type="event"`;
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }

exports.getLanguagesService = async function (data) {
    const {user_id}=data;
    const query = `select * from languages where user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }

exports.getbasicInfoService = async function (data) {
    const {user_id}=data;
    const query = `select * from basic_bio where user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }

exports.getbasicInfoService1 = async function (data) {
    const {user_id}=data;
    const query = `select contact_number,
                    primary_email,
                    secondary_email
                     from users where user_id='${user_id}'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }
        
exports.getPhotoService = async function (data) {
    const {user_id,type}=data;
    let query = ``;
    if(type=="tagged")
        query=`SELECT users.full_name,post_media.media_id,post_media.media_url,post_media.media_type,posts.total_likes,posts.user_id,posts.content FROM posts 
        INNER JOIN post_media on posts.post_id=post_media.post_id
        left join users on posts.user_id=users.user_id
        WHERE posts.tagged_user_ids like '%${user_id}%' AND post_media.media_type='image'`;
    else
        query=`SELECT users.full_name,post_media.media_id,post_media.media_url,post_media.media_type,posts.total_likes,posts.user_id,posts.content FROM posts 
            INNER JOIN post_media on posts.post_id=post_media.post_id
            left join users on posts.user_id=users.user_id
            WHERE posts.user_id='${user_id}' AND post_media.media_type="image"`;
        console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }

exports.getvideoService = async function (data) {
    const {user_id,type}=data;
    let query = ``;
    if(type=="tagged")
    query=`SELECT users.full_name,post_media.media_id,post_media.media_url,post_media.media_type,posts.total_likes,posts.user_id,posts.content FROM posts 
    INNER JOIN post_media on posts.post_id=post_media.post_id
    left join users on posts.user_id=users.user_id
    WHERE posts.tagged_user_ids like '%${user_id}%' AND post_media.media_type='video'`;
    else
    query=`SELECT users.full_name,post_media.media_id,post_media.media_url,post_media.media_type,posts.total_likes,posts.user_id,posts.content FROM posts 
        INNER JOIN post_media on posts.post_id=post_media.post_id
        left join users on posts.user_id=users.user_id
        WHERE posts.user_id='${user_id}' AND post_media.media_type='video'`;
    console.log(query);
    const [fields] = await dbpool.query(query);
    
    return fields;
    
    }



