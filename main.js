require("dotenv").config();
const logger = require("./utils/logger")("main");

const { fileSync } = require("./file_sync");

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");

fileSync.start();

logger.info("Конец асинхронного кода");

setTimeout(() => {
  logger.info("async code через 1 миллисекунду");
}, 1);

setTimeout(() => {
  logger.info("async code через 1 секунду");
}, 1000);
