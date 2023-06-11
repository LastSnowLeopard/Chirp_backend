const postService=require('../service/service');

const mail = require('../../../helper/mail')
const notification = require('../../../helper/notificationservice')




exports.uploadStory=async(req, res) =>{



    const { user_id, privacy_level, story_media, text_content, music_url, story_type, background_id,thumb_nail_url,font_id,font_color_id } = req.body;

    // if(story_type=="text"){
    //     // background_id
    //     // music_url
    //     // font_id
    //     // font_color_id

    // }else if(story_type=="image/video"){

    // }

    const storyData = {
    user_id: user_id || "",
    privacy_level: privacy_level || "",
    media_url: story_media || "",
    text_content: text_content || "",
    music_url: music_url || "",
    story_type: story_type || "",
    background_id: background_id|| "",
    thumb_nail_url:thumb_nail_url || "",
    font_id:font_id ||"",
    font_color_id:font_color_id || ""
    
    };

    try{
        var result = await postService.uploadStoryService(storyData);
        if(result>0)
            res.status(200).send({message:"story Created",data:{story_id:result},status: 1})
        else
            res.status(200).send({message:"story not  Created",data:{repley_id:result},status: 0})
    }catch(e){

    }

}


exports.readStories=async(req,res)=>{

let user_id=req.body.user_id;
try{

    var result = await postService.readstoryService(user_id);


    // if(result.length>0){
        res.status(200).send({message:"data fetched",data:{result},status: 1})
    // }else{
        res.status(200).send({message:"data not fetched",data:{result},status: 0})
    // }

}catch(e){


}



}

exports.createPost = async (req, res) => {

  let post_type = req.body.post_type || ""; // life event // normal post //live video // clip
  let user_id = req.body.userid;
  let gif_image_url = req.body.gif_image_url || "";
  let background_id = req.body.background_id || "";
  let tagged_user=req.body.tagged_user;
  let media=[];
  let content=req.body.content || "";
  let feeling=req.body.feeling || "";
  let privacy=req.body.privacy || "public";
  let location=req.body.location || "";
  let life_event_title=req.body.life_event_title || "";
  let location_lat_lng=req.body.location_lat_lng || "";
  let feeling_id=req.body.feeling_id || "";
  let feeling_name=req.body.feeling_name || "";
  let life_event_id=req.body.life_event_id || "";   
  let event_date=req.body.event_date || "";

  const filenames = req.files.map(file => {    
    media.push({"media_name":file.originalname,"media_type":file.mimetype.split('/')[0]}) ;
  }    
);

// create Post
   
    try {
        var create_post_id = await postService.createPost({user_id,tagged_user,content,feeling,privacy,location,location_lat_lng,life_event_title,post_type,feeling_id,feeling_name,life_event_id,event_date,gif_image_url,background_id});

       



        if ((create_post_id != null || create_post_id != undefined || create_post_id != "" || create_post_id != 0) && (media.length > 0)) {
          let media_query = `INSERT INTO post_media(post_id, media_url, media_type) VALUES ${media.map((m, index) => `( '${create_post_id}', '${m.media_name}', '${m.media_type}')`).join(',')};`;
          create_media_id = await postService.createPostMedia(media_query);
          console.log(media_query);
        const taggedUsersArray = tagged_user.split(',');
         let len=taggedUsersArray.length;
        let msg=``;
         if (len==1)
            msg=`'You are tagged in a post by'`;
         else if (len==2)
            msg=`'You and and  1 others user is tagged in a post by'`
         else
             msg=`'You and and  ${len} others are tagged in a post by'`
        
        if(len!=0){
            const values = taggedUsersArray.map(tagged_user1 => `(${msg}, ${tagged_user1}, 'tagged_post_created', ${user_id}, NOW(), 0)`);

          // Construct the insert statement
          const insertStatement = `INSERT INTO notifications (notification_text, notify_to, notificatio_type, notification_from, created_at, is_read)
                                   VALUES ${values.join(', ')}`;

            await notification.createNotification(insertStatement);

            
        
        }
          



          res.status(200).send({message:"Post Created Successfully",post_id:create_post_id,status: 1});
        } else {
          res.status(200).send({message:"Post Created Successfully",post_id:create_post_id,status: 1});
        }
        
            
    } catch (error) {
        console.log(error)
        res.status(500).send({message:error,status:0});
    }  
}

exports.UpdatePost = async (req, res) => {

    let post_type = req.body.post_type || ""; // life event // normal post //live video // clip
    let post_id = req.body.post_id;
    let user_id = req.body.userid;
    let gif_image_url = req.body.gif_image_url || "";
    let background_id = req.body.background_id || "";
    let tagged_user=req.body.tagged_user;
    let media=[];
    let content=req.body.content || "";
    let feeling=req.body.feeling || "";
    let privacy=req.body.privacy || "public";
    let location=req.body.location || "";
    let life_event_title=req.body.life_event_title || "";
    let location_lat_lng=req.body.location_lat_lng || "";
    let feeling_id=req.body.feeling_id || "";
    let feeling_name=req.body.feeling_name || "";
    let life_event_id=req.body.life_event_id || "";   
    let event_date=req.body.event_date || "";
    let deleted_media_ids=req.body.deleted_media_ids || "";
  
    const filenames = req.files.map(file => {    
      media.push({"media_name":file.originalname,"media_type":file.mimetype.split('/')[0]}) ;
    }    
  );
  
  // create Post
      try {
          var create_post_id = await postService.updatePost({post_id,user_id,tagged_user,content,feeling,privacy,location,location_lat_lng,life_event_title,post_type,feeling_id,feeling_name,life_event_id,event_date,gif_image_url,background_id});

          if ((create_post_id != null || create_post_id != undefined || create_post_id != "" || create_post_id != 0) && (media.length > 0)) {
            let media_query = `INSERT INTO post_media(post_id, media_url, media_type) VALUES ${media.map((m, index) => `( '${create_post_id}', '${m.media_name}', '${m.media_type}')`).join(',')};`;
            create_media_id = await postService.createPostMedia(media_query);
            if(deleted_media_ids.length>0)
            create_media_id = await postService.deletePostMedia(deleted_media_ids);

            res.status(200).send({message:"Post Created Successfully",post_id:create_post_id,status: 1});
          } else {
            res.status(200).send({message:"Post Created Successfully",post_id:create_post_id,status: 1});
          }
          
              
      } catch (error) {
          console.log(error)
          res.status(500).send({message:error,status:0});
      }  
  }
  
exports.getPostById = async (req, res) => {
    let data={
        page:req.body.page || 1,
        pageSize:req.body.pageSize || 10,
        userId : req.body.userId,
        requesterId : req.body.requesterId,
    };

    try {
        const response = await postService.getPostListService(data);
        response.tagged_user=[];

        if(response.posts.length > 0){
            for (let i = 0; i < response.posts.length; i++) {

                if(response.posts[i].tagged_user_ids!=null || response.posts[i].tagged_user_ids!=undefined || response.posts[i].tagged_user_ids!=""){
                       response.posts[i].tagged_user = await postService.getTaggedUsersDataService(response.posts[i].tagged_user_ids);
                }
                response.posts[i].media = await postService.getMediaPostService(response.posts[i].post_id);

                response.posts[i].commets = await postService.getMediaPostCommentsandRepliesService(response.posts[i].post_id);
            }
        }
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
}

exports.getPostbyShareableLink = async (req, res) => {
    let data={
        linkid : req.body.linkid,
        requesterId : req.body.requesterId,
    };

    try {
        const response = await postService.getPostListServiceForShareableLink(data);
        response.tagged_user=[];

        if(response.posts.length > 0){
            for (let i = 0; i < response.posts.length; i++) {

                if(response.posts[i].tagged_user_ids!=null || response.posts[i].tagged_user_ids!=undefined || response.posts[i].tagged_user_ids!=""){
                       response.posts[i].tagged_user = await postService.getTaggedUsersDataService(response.posts[i].tagged_user_ids);
                }
                response.posts[i].media = await postService.getMediaPostService(response.posts[i].post_id);

                response.posts[i].commets = await postService.getMediaPostCommentsandRepliesService(response.posts[i].post_id);
            }
        }
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
}

exports.likePost = async (req, res) => {
    let post_id=req.body.post_id;
    let user_id=req.body.user_id;

try {
    const respond = await postService.likepost_service(post_id,user_id);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}

exports.SharePost = async (req, res) => {
    let postid=req.body.post_id;
    var hash = Math.floor(1000 + Math.random() * 9000);
        hash=hash+"sl"+postid+"sl"+hash;
try {
    var respond = await postService.saveshareablelink({postid,hash});
    if(respond>="1"){
        
        let Link=`http://chirp.one/view/${hash}`;
            res.status(200).send({message:"shareable link generated",data:{link:Link},status:1})
    }else{
        res.status(200).send({message:"shareable link not generated",data:{},status:0})
    }

}catch(e){

    console.log(e);
}

}

exports.deletePost = async (req, res) => {
    let post_id=req.body.post_id;
    let user_id=req.body.user_id;
    

try {
    const respond = await postService.deletepost_service(post_id,user_id);
    if(respond.status=="1"){
            res.status(200).send({message:"deleted Successfully",data:{},status:1})
    }else{
            res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}

exports.getUsrFriendsByUserid = async (req, res) => {
    let user_id=req.body.userId;

try {
    const respond = await postService.getFriendsbyIdService(user_id);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}


}

exports.createComments = async (req, res) => {
    
    let comment = {
        post_id: req.body.post_id,
        user_id: req.body.userId,
        content: req.body.content,
        created_at: new Date()
      };

try {
    const respond = await postService.createCommentService(comment);

    if(respond.comment_id>"1"){
        console.log(respond.comment_id)
        let sql = `INSERT INTO notifications (notification_text, notify_to, notificatio_type, notification_from, created_at, is_read)
        VALUES ('You have received a new comment on your post from ', ${respond.user_id}, 'commentadded', ${comment.user_id}, NOW(), 0)`;

        await notification.createNotification(sql);


        res.status(200).send({message:"Comment Created Successfully",data:{comment_id:respond.comment_id},status: 1})
    }else{
        res.status(200).send({message:"Comment not Created Successfully",data:{},status: 0})
    }

}catch(e){
    res.status(500).send({message:"Server Error",data:e,status: 0})
}
}


exports.createReplies = async (req, res) => {
    let reply = {
        comment_id: req.body.comment_id,
        user_id: req.body.userId,
        post_id: req.body.post_id,
        content: req.body.content,
        created_at: new Date()


      };
    
    
      try {
        const respond = await postService.createRepliesService(reply);
        if(respond>"0"){
    
            res.status(200).send({message:"Reply Created Successfully",data:{repley_id:respond},status: 1})

        }else{
            res.status(200).send({message:"Reply not Created Successfully",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"Reply Created Successfully",data:{},status: 1})
    }

}




exports.updateComments = async (req, res) => {
    
    let comment = {
        comment_id: req.body.comment_id,
        content:req.body.content
      };

try {
    const respond = await postService.upadteCommentService(comment);   
    if(respond>0){

        res.status(200).send({message:"Comment updated Successfully",data:{},status: 1})
    }else{
        res.status(200).send({message:"Comment didnot updated Successfully",data:{},status: 0})
    }

}catch(e){
    res.status(500).send({message:"Server Error",data:{},status: 0})
}
}


exports.updateReplies = async (req, res) => {
    let reply = {
        repley_id: req.body.repley_id,
        content: req.body.content
      };
    
      try {
        const respond = await postService.updateRepliesService(reply);
        if(respond>"0"){
    
            res.status(200).send({message:"Reply updated Successfully",data:{repley_id:respond},status: 1})

        }else{
            res.status(200).send({message:"Reply not updated Successfully",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"Reply Created Successfully",data:{},status: 1})
    }

}


exports.deleteComments = async (req, res) => {
    let reply = {
        comment_id: req.body.comment_id
      };
    
      try {
        const respond = await postService.deleteCommentsService(reply);
        if(respond>"0"){
    
            res.status(200).send({message:"Reply deleted Successfully",data:{repley_id:respond},status: 1})

        }else{
            res.status(200).send({message:"Reply not deleted Successfully",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"Reply not deleted Successfully",data:{},status: 0})
    }
}


exports.deleteReplies = async (req, res) => {
    let reply = {
        repley_id: req.body.repley_id,
      };
    
      try {
        const respond = await postService.deleteRepliesService(reply);
        if(respond>"0"){
    
            res.status(200).send({message:"Reply deleted Successfully",data:{repley_id:respond},status: 1})

        }else{
            res.status(200).send({message:"Reply not deleted Successfully",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"Reply not deleted Successfully",data:{},status: 1})
    }

}

// exports.searchNewsFeed = async (req, res) => {

// let search_for=req.body.search_for || ""; //friends --posts --pages -- groups 
// let filter=req.body.filter || "";
// let search_word=req.body.search_word || "";
// let user_id=req.body.user_id || "";
// const respond = await postService.searchpeople(search_word);
// }

exports.searchNewsFeed = async (req, res) => {
    let data={
        page:req.body.page || 1,
        pageSize:req.body.pageSize || 10,
        userId : req.body.userId,
        requesterId : req.body.requesterId,
    };

    try {
        const response = await postService.getPostListServiceNewsFeed(data);
        response.tagged_user=[];

        if(response.posts.length > 0){
            for (let i = 0; i < response.posts.length; i++) {

                if(response.posts[i].tagged_user_ids!=null || response.posts[i].tagged_user_ids!=undefined || response.posts[i].tagged_user_ids!=""){
                       response.posts[i].tagged_user = await postService.getTaggedUsersDataService(response.posts[i].tagged_user_ids);
                }
                response.posts[i].media = await postService.getMediaPostService(response.posts[i].post_id);

                response.posts[i].commets = await postService.getMediaPostCommentsandRepliesService(response.posts[i].post_id);
            }
        }
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }  
}






exports.SendFriendRequest = async (req, res) => {
    let data = {
        user_id: req.body.userId,
        friend_id: req.body.friendId,
      };
    
    
      try {
        const respond = await postService.SendFriendRequestService(data);
        if(respond>"0"){
    
            res.status(200).send({message:"Friend Request Sent Successfully",data:{id:respond},status: 1})

        }else{
            res.status(200).send({message:"Friend Request not Sent Successfully",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"err",data:{},status: 1})
    }

}



exports.AcceptFriendRequest = async (req, res) => {
    let data = {
        userId: req.body.userId,
        friendId: req.body.friendId
      };
    
      try {
        const respond = await postService.acceptFriendRequestService(data);
        if(respond>"0"){
    
            res.status(200).send({message:"Friend Request Successfully Accepted",data:{data:respond},status: 1})

        }else{
            res.status(200).send({message:"Friend Request not Successfully Accepted",data:{},status: 0})
        }
    
    }catch(e){
        res.status(500).send({message:"err",data:{},status: 1})
    }

}




exports.getFriendRequestList = async (req, res) => {
    let user_id=req.body.userId;

try {
    const respond = await postService.getFriendRequestListService(user_id);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}


}

exports.searchPeople = async (req, res) => {
    let user_id=req.body.userId;
    let search=req.body.search;

try {
    const respond = await postService.searchPeopleService(user_id,search);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}


}



exports.readNotification = async (req, res) => {
    let user_id=req.body.userId;

try {
    const respond = await postService.readNotificationService(user_id);
    if(respond.status=="1"){

            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}


}
