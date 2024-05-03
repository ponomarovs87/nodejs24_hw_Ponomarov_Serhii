require("dotenv").config();
const path = require("path");
process.env["MY_CONFIG"] = path.join(
  __dirname,
  "config",
  "default.js"
);
require(process.env.MY_CONFIG);
const logger = require(process.env.MY_LOGGER)("main");
const { fileSync } = require("./file_sync");

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");

fileSync.start();

logger.info(
  "я не блокирую ИвентЛуп если я сначала или блочу если я после"
);

setTimeout(() => {
  console.log("1");
}, 1);

setTimeout(() => {
  console.log("1000");
}, 1000);
