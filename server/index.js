const express = require("express"),
  app = express(),
  cors = require("cors"),
  router = require("./routes/upload_file"),fs =require('fs')
app.use(cors());

app.use("/", router);
// const result = fs.readdir('@uploads/root')
app.listen("3005", () => {
// console.log(fs.readdir('@uploads/root'));
  console.log("server is up on port 3005");
});
