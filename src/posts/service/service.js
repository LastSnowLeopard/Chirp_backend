const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.createPost = async function (data) {
    const { user_id,tagged_user,content,feeling_id,feeling_name,privacy,location,location_lat_lng,life_event_title,post_type,life_event_id,event_date } = data;

    let post_query=`INSERT INTO posts (user_id, content, post_type, tagged_user_ids, privacy, location,feeling_id,feeling_name, location_lat_lng, life_event_id,event_name,event_date) 
    VALUES (${user_id}, '${content}', '${post_type}', '${tagged_user}', '${privacy}', '${location}', '${feeling_id}','${feeling_name}','${location_lat_lng}','${life_event_id}', '${life_event_title}','${event_date}')`;
    try {
        console.log(post_query);
        const [fields] = await dbpool.query(post_query);
        
        console.log(fields.insertId);
        return fields.insertId;
            
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};

exports.createPostMedia = async function (query) {

    try {
        const [fields] = await dbpool.query(query);
        
        console.log(fields.insertId);
        return fields.insertId;
            
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};



exports.getPostListService = async function (data) {

    let query=``;
    if(data.filter == "all"){
        query=``;
    }

    try {
        var sql =  `SELECT 
        posts.post_id, 
        posts.total_likes, 
        posts.user_id,
        users.full_name, 
        posts.content, 
        posts.location, 
        posts.location_lat_lng, 
        posts.post_type, 
        posts.tagged_user_ids, 
        posts.life_event_id, 
        posts.feeling_id, 
        posts.event_date, 
        posts.privacy, 
        posts.created_at,
        feelings_list.feelings_name,
        feelings_list.feelings_icon_url,
        event_list.event_name,
        event_list.event_icon_url,
        CASE 
          WHEN likes.user_id = ${data.userId} THEN 1 
          ELSE 0 
        END AS is_liked
      FROM posts
      LEFT JOIN users ON posts.user_id = users.user_id 
      LEFT JOIN likes ON posts.post_id = likes.post_id 
      LEFT JOIN feelings_list ON feelings_list.feelings_id = posts.feeling_id
      LEFT JOIN event_list ON event_list.event_id = posts.life_event_id  
      WHERE (posts.user_id = '${data.userId}' OR posts.tagged_user_ids like '%${data.userId}%' ) AND deleted = '0' 
      LIMIT ${data.pageSize} OFFSET ${(data.page - 1) * data.pageSize}
      `;

        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `SELECT  count(*) FROM posts
         left join feelings_list on feelings_list.feelings_id=posts.feeling_id
         left join event_list on event_list.event_id=posts.life_event_id     WHERE posts.user_id='${data.userId}' AND deleted='0'`;
        const [field] = await dbpool.query(sql1);
            return {message:"data fetched",posts:fields,total_page:Math.ceil(field[0]['count(*)']/data.pageSize),pageno:data.page,status:1}
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



exports.getTaggedUsersDataService = async function (tagged_user_id_array) {
    try {
        var sql =  `SELECT user_id,full_name FROM users WHERE user_id IN (${tagged_user_id_array})`;

        const [fields] = await dbpool.query(sql)

        if (fields.length >= 0) {


            return fields;
                }
            else
        {
            return  fields
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};




exports.getMediaPostService = async function (post_id) {
    try {
        var sql =  `SELECT * FROM post_media where post_id = ${post_id}`;

        const [fields] = await dbpool.query(sql)

        if (fields.length >= 0) {


            return fields;
                }
            else
        {
            return  fields
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};


exports.likepost_service = async function (post_id,user_id) {
    
    var sql = `SELECT * FROM likes WHERE user_id='${user_id}'  AND post_id='${post_id}'`;
  console.log(sql);
   var [fields] = await dbpool.query(sql)
   console.log(fields);

   if (fields.length >= 0) {
    const sqllll =  `delete from likes  WHERE user_id='${user_id}'  AND post_id='${post_id}'`;
    console.log(sqllll)
    const [fieldss] = await dbpool.query(sqllll);
    console.log(fieldss,sqllll)
    if(fieldss.affectedRows>=1){
      
                const sql =  `update posts SET total_likes =total_likes-1 where post_id = ${post_id}`;
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

                    const sqllll =  `INSERT INTO likes( user_id, post_id) VALUES ('${user_id}','${post_id}')`;
                    console.log(sqllll)
                    const [fieldss] = await dbpool.query(sqllll);
                    console.log(fieldss,sqllll)
                    if(fieldss.affectedRows>=1){
      
                        const sql1 =  `update posts SET total_likes =total_likes+1 where post_id = ${post_id}`;
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



 
exports.getFriendsbyIdService = async function (user_id) {
    try {
        var sql =  `SELECT friends.user_id as id, friends.friend_user_id as friend_id, users.full_name as friend_name,profiles.profile_image_url as friend_profile_image 
                    FROM friends LEFT JOIN users on friends.friend_user_id=users.user_id LEFT JOIN profiles on friends.friend_user_id=profiles.user_id 
                    WHERE friends.status="accepted" and friends.user_id=${user_id};`;

        const [fields] = await dbpool.query(sql)

        if (fields.length >= 0) {


            return fields;
                }
            else
        {
            return  fields
        }       
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};