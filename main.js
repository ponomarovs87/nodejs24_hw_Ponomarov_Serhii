require("dotenv").config();
require('module-alias/register')
const logger = require("#logger")("main");
const fileSync = require("./file_sync");

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");

fileSync.start();

logger.info("я не блокирую ИвентЛуп если я сначала или блочу если я после");
