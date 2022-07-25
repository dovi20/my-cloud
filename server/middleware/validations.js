const { rejects } = require("assert");
const fs = require("fs");

async function haveFolder(req, res, next) {
  console.log("valid", req.body.path);
  const path = `.${req.body.path}`;
  const folderExist = fs.existsSync(path);
  if (!folderExist) {
    res.status(404).send("not found");
  } else {
    next();
  }
}
async function isExixst(req, res, next) {
  const path = `.${req.body.path}/${req.body.folder}`;
  const exist = fs.existsSync(path);
  console.log(exist);
  if (exist) {
    res.status(400).send("alredy exist");
  } else {
    next();
  }
}
async function validName(req,res,next){
    const folderName = req.body.folder
    const valid = /[<>:"\/\\|?*\x00-\x1F]/;
    console.log('testvalid',valid.test(folderName));
    if(valid.test(folderName)){
        res.status(400).send('name not valid')
    }else{
        next()
    }
}


module.exports = { haveFolder, isExixst ,validName};
