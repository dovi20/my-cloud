const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = req.headers.path;
    console.log('req'); 
    console.log(path);
    cb(null, `.${path}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

module.exports = upload