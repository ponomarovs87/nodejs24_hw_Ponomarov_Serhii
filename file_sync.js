const fsAsync = require("fs/promises");
const path = require("path");

const fileSync = {
  start() {
    console.log(path);
  },
};

module.exports = fileSync;
