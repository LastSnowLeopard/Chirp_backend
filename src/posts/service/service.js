const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.createPost = async function (data) {
    const { user_id,tagged_user,content,feeling_id,feeling_name,privacy,location,location_lat_lng,life_event_title,post_type,life_event_id,event_date,gif_image_url,background_id } = data;

    let post_query=`INSERT INTO posts (user_id, content, post_type, tagged_user_ids, privacy, location,feeling_id,feeling_name, location_lat_lng, life_event_id,event_name,event_date,gif_image_url,background_id) 
    VALUES (${user_id}, '${content}', '${post_type}', '${tagged_user}', '${privacy}', '${location}', '${feeling_id}','${feeling_name}','${location_lat_lng}','${life_event_id}', '${life_event_title}','${event_date}','${gif_image_url}','${background_id}')`;
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

exports.updatePost = async function (data) {
    const { post_id,user_id,tagged_user,content,feeling_id,feeling_name,privacy,location,location_lat_lng,life_event_title,post_type,life_event_id,event_date,gif_image_url,background_id } = data;

    const post_query = `UPDATE posts SET 
    user_id = ${user_id},
    content = '${content}',
    post_type = '${post_type}',
    tagged_user_ids = '${tagged_user}',
    privacy = '${privacy}',
    location = '${location}',
    feeling_id = '${feeling_id}',
    feeling_name = '${feeling_name}',
    location_lat_lng = '${location_lat_lng}',
    life_event_id = '${life_event_id}',
    event_name = '${life_event_title}',
    event_date = '${event_date}',
    gif_image_url = '${gif_image_url}',
    background_id = '${background_id}'
    WHERE post_id = ${post_id}`;

  try {
    let [fields]=await dbpool.query(post_query);
    if(fields.affectedRows>0){
        return post_id;
    }else{
        return 0;
    }
  } catch (err) {
    console.error(err);
    throw err;
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



exports.deletePostMedia = async function (mediaIds) {
    const deleteQuery = `DELETE FROM post_media WHERE media_id IN (${mediaIds})`;
    try {
      await dbpool.query(deleteQuery);
      
    } catch (err) {
      console.error(err);
      throw err;
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
        post_backgrounds.id as post_backgroundid,
        post_backgrounds.background_type,
        post_backgrounds.color_code,
        post_backgrounds.image_url as background_image_url,
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
      LEFT JOIN post_backgrounds ON posts.background_id = post_backgrounds.id 
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
exports.getPostListServiceNewsFeed = async function (data) {

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
        post_backgrounds.id as post_backgroundid,
        post_backgrounds.background_type,
        post_backgrounds.color_code,
        post_backgrounds.image_url as background_image_url,
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
      LEFT JOIN post_backgrounds ON posts.background_id = post_backgrounds.id 
      LEFT JOIN feelings_list ON feelings_list.feelings_id = posts.feeling_id
      LEFT JOIN event_list ON event_list.event_id = posts.life_event_id  
      WHERE (posts.user_id = '${data.userId}' OR posts.user_id in (select user_id from friends where status='accepted' AND friend_user_id='${data.userId}' ) OR posts.tagged_user_ids like '%${data.userId}%' ) AND deleted = '0' 
      order by  posts.post_id desc
      LIMIT ${data.pageSize} OFFSET ${(data.page - 1) * data.pageSize}
      `;

        const [fields] = await dbpool.query(sql)
        console.log(fields);

        if (fields.length >= 0) {

         var sql1 = `SELECT  count(*) FROM posts
         left join feelings_list on feelings_list.feelings_id=posts.feeling_id
         left join event_list on event_list.event_id=posts.life_event_id 
         WHERE posts.user_id='${data.userId}' OR posts.user_id in (select user_id from friends where status='accepted' AND friend_user_id='${data.userId}') AND deleted='0'
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

exports.searchpeople = async function (keyword) {

    let query=``;

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
        post_backgrounds.id as post_backgroundid,
        post_backgrounds.background_type,
        post_backgrounds.color_code,
        post_backgrounds.image_url as background_image_url,
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
      LEFT JOIN post_backgrounds ON posts.background_id = post_backgrounds.id 
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

        
        const [data] = await dbpool.query(`SELECT user_id FROM posts WHERE post_id=${comment.post_id}`);
        
        console.log({"comment_id":fields.insertId, "user_id":data[0].user_id});
        return {"comment_id":fields.insertId, "user_id":data[0].user_id};
    }catch (err) {
        console.error(err)
        return err+"System Error";
    }
    
    }

    exports.upadteCommentService = async function (comment ) {
        const query = `update comments set content='${comment.content}' where comment_id='${comment.comment_id}'`;       
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            
            if(fields.affectedRows>0)
            return 1;
            else
            return 0;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }
        
        }
  
    exports.updateRepliesService = async function (comment ) {
        const query = `update comment_replies set content='${comment.content}' repley_id='${comment.repley_id}'`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            if(fields.affectedRows>0)
            return 1;
            else
            return 0;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }
        
        }

    exports.deleteCommentsService = async function (comment ) {

        const query = `delete from  comments where  comment_id='${comment.repley_id}'`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            if(fields.affectedRows>0)
            return 1;
            else
            return 0;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }
        
    }

    exports.deletestoryService = async function (story ) {

        const query = `Delete FROM userstories WHERE user_id='${story.userId}' AND id='${story.storyId}'`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            if(fields.affectedRows>0)
            return 1;
            else
            return 0;
        }catch (err) {
            console.error(err)
            return err+"System Error";
        }
        
        }


        
    exports.deleteRepliesService = async function (comment ) {

        const query = `delete from comment_replies where repley_id='${comment.repley_id}'`;
        try {
            console.log(query);
            const [fields] = await dbpool.query(query);
            if(fields.affectedRows>0)
            return 1;
            else
            return 0;
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


exports.SendFriendRequestService = async function (data ) {
    const { user_id,friend_id } = data;


    const query = `INSERT INTO friends (user_id, friend_user_id, status) 
           VALUES ('${friend_id}', '${user_id}', 'pending')`;

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


exports.acceptFriendRequestService = async function (data ) {
    var query = `update friends set status='accepted' where user_id='${data.userId}' AND friend_user_id='${data.friendId}'`;
    try {
        console.log(query);
        const [fields] = await dbpool.query(query);
        if(fields.affectedRows>0)
        {
            query = `INSERT INTO friends (user_id, friend_user_id, status) 
            VALUES ('${data.friendId}', '${data.userId}', 'accepted')`;

            console.log(query);
            const [fields] = await dbpool.query(query);
            return 1;
            }
        else
        return 0;
    }catch (err) {
        console.error(err)
        return err+"System Error";
    }
    
    }

    

    exports.getFriendRequestListService = async function (user_id) {
        try {
            var sql =  `SELECT friends.user_id as userID, friends.friend_user_id as friend_id, users.full_name as friend_name,profiles.profile_image_url as friend_profile_image 
                        FROM friends
                        left JOIN users on users.user_id =friends.friend_user_id
                        left JOIN profiles on profiles.user_id=friends.friend_user_id 
                        WHERE friends.status="pending" and friends.user_id=${user_id};`;
    
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

    exports.searchPeopleService = async function (user_id,searchword) {
        try {
            var sql =  `SELECT users.user_id as peopleid, users.full_name, profiles.profile_image_url, 
                        CASE WHEN friends.status IS NULL 
                        THEN 'not friend' ELSE friends.status
                        END AS friend_status FROM users JOIN profiles ON users.user_id = profiles.user_id 
                        LEFT JOIN friends ON friends.friend_user_id = users.user_id AND friends.user_id = '${user_id}' 
                        WHERE users.full_name LIKE '%${searchword}%' AND (users.user_id <> '${user_id}' OR friends.user_id IS NULL)`;
    
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


    exports.readNotificationService = async function (user_id) {
        try {
            var sql =  `SELECT n.id, n.notification_text, n.notify_to, n.notificatio_type, n.notification_from, n.created_at, n.is_read,
                        u.full_name, p.profile_image_url
                        FROM notifications n
                        left JOIN users u ON n.notification_from = u.user_id
                        left JOIN profiles p ON u.user_id = p.user_id
                        WHERE n.notify_to ='${user_id}' order by n.id desc limit 100`;
            console.log(sql)
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

    
    exports.uploadStoryService = async function (data) {
        
        
        const { font_color_id,font_id,user_id, privacy_level, media_url, text_content, music_url, story_type, background_id,thumb_nail_url } =data;
        let post_query=`insert into userstories(font_color_id,font_id,user_id, privacy_level,media_url,text_content,music_url,story_type,background_id,thumb_nail_url) 
        VALUES('${font_color_id}','${font_id}',${user_id}, '${privacy_level}', '${media_url}','${text_content}', '${music_url}', '${story_type}', '${background_id}','${thumb_nail_url}')`;
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
    

    
    exports.readstoryService = async function (userid) {

            // `SELECT id, user_id, privacy_level, media_url, text_content, music_url, story_type, thumb_nail_url, background_id 
            // FROM userstories WHERE user_id IN (SELECT friend_user_id FROM friends WHERE user_id='1') or user_id=1`
          
            let query=`SELECT us.id, us.user_id, us.privacy_level, us.media_url, us.text_content, us.music_url, us.story_type, us.thumb_nail_url, us.background_id,
            p.profile_image_url, u.full_name, f.font_id, f.font_name, pb.image_url as image_url, pb.color_code as font_color
     FROM userstories us
     left JOIN users u ON us.user_id = u.user_id
     left JOIN profiles p ON u.user_id = p.user_id
     left JOIN fonts f ON us.font_id = f.font_id
     left JOIN post_backgrounds pb ON us.font_color_id = pb.id
     WHERE us.user_id IN (SELECT friend_user_id FROM friends WHERE user_id = '${userid}') OR us.user_id = '${userid}'
     order by us.id desc;`
                        console.log(query)
            
            const [fields] = await dbpool.query(query);

            return fields;
            

            


    }
