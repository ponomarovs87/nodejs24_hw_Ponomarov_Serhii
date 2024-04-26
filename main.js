require("dotenv").config();
const logger = require("./utils/logger")("main");
const fileSync = require("./file_sync");
fileSync.start();

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");
logger.info("the script is running!", 2, 345, 2);
logger.error(
  "the script is running!",
  2,
  345,
  2,
  {},
  [1, 2],
  {
    name: "Serhii",
    innerObj: {
      name: "Vasya",
      innerObj: {
        name: "Vasya2",
        innerArray: [1, "82", { name: "123" }],
      },
    },
  }
);
