const postService=require('../service/service');

const mail = require('../../../helper/mail')

exports.createPost = async (req, res) => {

  let post_type = req.body.post_type || ""; // life event // normal post //live video // clip
  let user_id = req.body.userid;
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
        var create_post_id = await postService.createPost({user_id,tagged_user,content,feeling,privacy,location,location_lat_lng,life_event_title,post_type,feeling_id,feeling_name,life_event_id,event_date});

        if ((create_post_id != null || create_post_id != undefined || create_post_id != "" || create_post_id != 0) && (media.length > 0)) {
          let media_query = `INSERT INTO post_media(post_id, media_url, media_type) VALUES ${media.map((m, index) => `( '${create_post_id}', '${m.media_name}', '${m.media_type}')`).join(',')};`;
          create_media_id = await postService.createPostMedia(media_query);
          console.log(media_query);
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
    if(respond>"1"){

        res.status(200).send({message:"Comment Created Successfully",data:{comment_id:respond},status: 1})
    }else{
        res.status(200).send({message:"Comment not Created Successfully",data:{},status: 0})
    }

}catch(e){
    res.status(500).send({message:"Server Error",data:{},status: 0})
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