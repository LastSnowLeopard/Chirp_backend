const multer = require('multer');

const fileFilter = (req, file, cb,next) => {
  try{
    console.log(file.mimetype)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif' || file.mimetype === 'image/webp') {
      return cb(null, true);
  } else {
      return cb(null, false,new Error('Invalid file type, only JPEG, JPG, GIF, WEBP and PNG is allowed!'));
  }
}
catch(err)
{
console.log("image not found")
next();
}
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
    if(file.fieldname=='cover_image'){
      req.body.cover_image='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }
    if(file.fieldname=='profile_image'){
      req.body.profile_image='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }

    if(file.fieldname=='img1'){
      req.body.img1='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }
    if(file.fieldname=='img2'){
      req.body.img2='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }
    if(file.fieldname=='img3'){
      req.body.img3='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }
    if(file.fieldname=='img4'){
      req.body.img4='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }
    if(file.fieldname=='img5'){
      req.body.img5='uploads/'+file.fieldname + '-' + uniqueSuffix;
    }

  }
})

const upload = multer({fileFilter, storage: storage })


module.exports = upload;