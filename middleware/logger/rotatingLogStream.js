const rfs = require("rotating-file-stream");
const path = require("path");

function createGenerator(fileName) {
  return function generator(time, index) {
    if (!time) return `${fileName}.log`;

    const year = time.getFullYear();
    const month = `0${time.getMonth() + 1}`.slice(-2);
    const day = `0${time.getDate()}`.slice(-2);

    return `${year}-${month}-${day}-${index}-${fileName}.log`;
  };
}
const createRotationLogStream = (
  folderName = "log",
  interval = "1d",
  maxFiles = 2,
  fileName = folderName
) => {
  return rfs.createStream(createGenerator(fileName), {
    interval,
    path: path.join(process.cwd(), "logs", `${folderName}s`),
    maxFiles,
    // compress: "gzip", // сжатие старых файлов
  });
};

module.exports = createRotationLogStream;
