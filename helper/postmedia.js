const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    file.originalname='uploads/'+file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]
  }
});

const upload = multer({ storage: storage }).array('media');

function uploadFiles(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: 'Error uploading files', error: err ,status:0});
    }
    next();
  });
}

module.exports = { uploadFiles };
