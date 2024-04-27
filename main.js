require("dotenv").config();
const logger = require("./utils/logger")("main");
const fileSync = require("./file_sync");
fileSync.start();

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");
