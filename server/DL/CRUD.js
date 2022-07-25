const fs = require('fs')

async function createDir(path) {
    return await fs.mkdirSync(path)
  }
  async function readFiles(filter) {
    return await fs.accessSync
  }
  async function read(filter) {
    return await userModel.find(filter);
  }
  async function update(filter, newData) {
    return await userModel.updateOne(filter, newData);
  }
  async function del(filter) {
    await update(filter, { isActive: flase });
  }
  
  module.exports = { createDir, read, update, del };