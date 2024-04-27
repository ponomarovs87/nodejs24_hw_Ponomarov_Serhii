require("dotenv").config();
const logger = require("./utils/logger")("main");

logger.info("the script is running!");
logger.warn("the script is running!");
logger.error("the script is running!");
logger.info("the script is running!", 2, 345, 2);
logger.error("the script is running!", 2, 345, 2, {}, [1, 2], {
  name: "Serhii",
  innerOBJ: {
    name: "vasya",
    innerobj: { name: "vasya2", innerarray: [1, "82", { name: "123" }] },
  },
});
