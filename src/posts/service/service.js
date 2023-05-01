const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.createPost = async function (data) {
    const { user_id,tagged_user,content,feeling_id,feeling_name,privacy,location,location_lat_lng,life_event_title,post_type,life_event_id,event_date } = data;

    let post_query=`INSERT INTO posts (user_id, content, post_type, tagged_user_ids, privacy, location,feeling_id,feeling_name, location_lat_lng, life_event_id,event_name,event_date,gif_image_url) 
    VALUES (${user_id}, '${content}', '${post_type}', '${tagged_user}', '${privacy}', '${location}', '${feeling_id}','${feeling_name}','${location_lat_lng}','${life_event_id}', '${life_event_title}','${event_date}','${gif_image_url}')`;
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
        profiles.profile_image_url, 
        posts.content, 
        posts.location, 
        posts.gif_image_url, 
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
      LEFT JOIN profiles ON posts.user_id = profiles.user_id
      LEFT JOIN likes ON posts.post_id = likes.post_id 
      LEFT JOIN feelings_list ON feelings_list.feelings_id = posts.feeling_id
      LEFT JOIN event_list ON event_list.event_id = posts.life_event_id  
      WHERE (posts.user_id = '${data.userId}' OR posts.tagged_user_ids like '%${data.userId}%' ) AND deleted = '0' 
      order by  posts.post_id desc
      LIMIT ${data.pageSize} OFFSET ${(data.page - 1) * data.pageSize}
      `;

        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `SELECT  count(*) FROM posts
         left join feelings_list on feelings_list.feelings_id=posts.feeling_id
         left join event_list on event_list.event_id=posts.life_event_id     WHERE posts.user_id='${data.userId}' AND deleted='0'
         order by  posts.post_id desc`;
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

exports.getPostListServiceForShareableLink = async function (data) {

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
        profiles.profile_image_url, 
        posts.content, 
        posts.location, 
        posts.gif_image_url, 
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
          WHEN likes.user_id = ${data.requesterId} THEN 1 
          ELSE 0 
        END AS is_liked
      FROM posts
      LEFT JOIN users ON posts.user_id = users.user_id 
      LEFT JOIN profiles ON posts.user_id = profiles.user_id
      LEFT JOIN likes ON posts.post_id = likes.post_id 
      LEFT JOIN feelings_list ON feelings_list.feelings_id = posts.feeling_id
      LEFT JOIN event_list ON event_list.event_id = posts.life_event_id  
      WHERE posts.shareable_id='${data.linkid}' AND  deleted = '0' 
      `;

        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

            return {message:"data fetched",posts:fields,status:1}
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
        var sql =  `SELECT u.user_id, u.full_name, p.profile_image_url
        FROM users u
        LEFT JOIN profiles p ON u.user_id = p.user_id        
         WHERE u.user_id IN ('${tagged_user_id_array}')`;

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



exports.getMediaPostCommentsandRepliesService = async function (post_id) {
    try {
        var sql =  `SELECT c.comment_id, c.post_id, c.user_id, u1.full_name AS user_name, p1.profile_image_url AS user_profile_image,
        c.content, c.created_at, r.reply_id, r.comment_id as reply_comment_id, r.user_id as reply_user_id, 
        u2.full_name AS reply_user_name, p2.profile_image_url AS reply_user_profile_image, r.content as reply_content, 
        r.created_at as reply_created_at 
FROM comments c 
LEFT JOIN comment_replies r ON c.comment_id = r.comment_id 
JOIN users u1 ON c.user_id = u1.user_id 
LEFT JOIN users u2 ON r.user_id = u2.user_id 
LEFT JOIN profiles p1 ON c.user_id = p1.user_id 
LEFT JOIN profiles p2 ON r.user_id = p2.user_id 
WHERE c.post_id = ${post_id}
ORDER BY c.comment_id ASC, r.created_at ASC


`;

        const [results] = await dbpool.query(sql)

        if (results.length >= 0) {
            const comments = {};

            results.forEach(row => {
              const commentId = row.comment_id;
          
              // If this is the first time we're encountering this comment ID, add it to the comments object
              if (!comments[commentId]) {
                comments[commentId] = {
                  comment_id: commentId,
                  post_id: row.post_id,
                  user_id: row.user_id,
                  content: row.content,
                  user_name: row.user_name,
                  user_profile_image: row.user_profile_image,
                  created_at: row.created_at,
                  replies: []
                };
              }
          
              // If there is a reply for this row, add it to the current comment's replies array
              if (row.reply_id) {
                comments[commentId].replies.push({
                  reply_id: row.reply_id,
                  comment_id: row.reply_comment_id,
                  user_id: row.reply_user_id,
                  user_name: row.reply_user_name,
                  user_profile_image: row.reply_user_profile_image,
                  content: row.reply_content,
                  created_at: row.reply_created_at
                });
              }
            });
          
            // Convert the comments object to an array of comment objects
            const commentArray = Object.values(comments);

            return commentArray;
           
                }
            else
        {
            return  results;
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




exports.createCommentService = async function (comment ) {

    const query = `INSERT INTO comments ( post_id, user_id, content) 
               VALUES ( ${comment.post_id}, ${comment.user_id}, '${comment.content}')`;
    try {
        console.log(query);
        const [fields] = await dbpool.query(query);
        
        console.log(fields.insertId);
        return fields.insertId;
    }catch (err) {
        console.error(err)
        return err+"System Error";
    }
    
    }
    exports.saveshareablelink = async function (data ) {

        const query = `update posts set shareable_id='${data.hash}' where post_id='${data.postid}'`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            
            console.log(fields.affectedRows);
            return fields.affectedRows;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }
        
        }


    


    exports.createRepliesService = async function (reply ) {
        const { comment_id, post_id, user_id, content } = reply;
        const query = `INSERT INTO comment_replies (comment_id, post_id, user_id, content) 
               VALUES ('${comment_id}', '${post_id}', '${user_id}', '${content}')`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);

            console.log(fields.insertId);
            return fields.insertId;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }



}


exports.deletepost_service = async function (post_id, user_id ) {
    const deletepost = `delete from posts where post_id='${post_id}' AND user_id='${user_id}'`;
    const deletelikes =`delete FROM likes WHERE post_id='${post_id}'`
    try {
        const [fields] = await dbpool.query(deletepost);
        const [field] = await dbpool.query(deletelikes);
        console.log("okokopkoko",deletepost,deletelikes)

        return {message:"deleted Successfully",data:{},status:1}
    }catch (err) {
        return {message:"Not deleted Successfully",data:{},status:0}
    }



}
