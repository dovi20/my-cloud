const express = require("express");
const router = express.Router();
const { createDir } = require("../DL/CRUD");
const upload = require("../middleware/multer");
const fs = require("fs"),
  bodyParser = require("body-parser"),
  jsonParser = bodyParser.json();
const { isExixst, haveFolder,validName } = require("../middleware/validations");

router.get("/getfiles", async (req, res) => {
  const path = req.headers.path;
  if (path.length<2){
    res.status(404).send('not found')
  }else{
  let files = [],
    folders = [];
  const file = fs.readdirSync(`.${path}`).map((v) => {
    fs.statSync(`.${path}/${v}`).isDirectory()
      ? folders.push(v)
      : files.push(v);
  });
  res.send({
    body: {
      files,
      folders,
    },
  })};
});

router.post("/uploadfile", upload.single("file"), async (req, res) => {
  try {
    // fs.copyFileSync(`./temp/${req.file.originalname}`,`.${req.body.path}/${req.file.originalname}`)
    console.log("req", req.file);
    res.status(200).send("ok");
    return true;
  } catch (err) {
    throw err;
  }
});

router.post("/create-folder", jsonParser,haveFolder,isExixst,validName, async (req, res) => {
  console.log("start create");
  try {
    console.log(req.body);
    const pathName = req.body.path;
    const folderName = req.body.folder;
    const result = fs.mkdirSync(`.${pathName}/${folderName}`);
    return result;
  } catch (err) {
    throw err;
  }
});

module.exports = router;
