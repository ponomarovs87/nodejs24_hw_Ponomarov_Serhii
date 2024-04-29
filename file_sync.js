const fsAsync = require("fs/promises");
const path = require("path");
const logger = require("./utils/logger")("file_sync");

async function greatFolderStructure(
  foldersArray,
  targetDir
) {
  const logsArray = [];
  for (const item of foldersArray) {
    const newFolderName = path.join(targetDir, item);
    // await fsAsync.mkdir(newFolderName);
    logsArray.push(newFolderName);
  }
  return logsArray;
}

async function copyFile(filesArray, targetDir) {
  const logsArray = [];
  for (const item of filesArray) {
    const newFileName = path.join(targetDir, item);
    // await fsAsync.copyFile(item, newFileName);
    logsArray.push(newFileName);
  }
  return logsArray;
}

async function readDirectoryStructure(directoryPath) {
  const result = {
    files: [],
    directories: [],
  };

  const items = await fsAsync.readdir(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = await fsAsync.stat(itemPath);

    if (stats.isFile()) {
      result.files.push(item);
    } else if (stats.isDirectory()) {
      result.directories.push(item);
      const subDirectoryStructure =
        await readDirectoryStructure(itemPath);
      subDirectoryStructure.files.forEach((file) => {
        result.files.push(path.join(item, file));
      });
      subDirectoryStructure.directories.forEach(
        (subDirectory) => {
          result.directories.push(
            path.join(item, subDirectory)
          );
        }
      );
    }
  }

  return result;
}

async function compareItemsAsync(
  donorItems,
  targetItems,
  missingStructure,
  matches
) {
  for (const item of donorItems) {
    if (!targetItems.includes(item)) {
      missingStructure.push(item);
    } else {
      matches.push(item);
    }
  }
}

async function compareFolders(donor, target) {
  const missingStructure = {
    files: [],
    directories: [],
  };

  const matches = {
    files: [],
    directories: [],
  };

  await compareItemsAsync(
    donor.files,
    target.files,
    missingStructure.files,
    matches.files
  );

  await compareItemsAsync(
    donor.directories,
    target.directories,
    missingStructure.directories,
    matches.directories
  );

  return { missingStructure, matches };
}

async function foldersSync(donorDir, targetDir) {
  const info = "info";
  const warn = "warn";
  const logs = { info: [], warn: [] };

  function addLog(directory, data) {
    if (Array.isArray(data)) {
      for (const i of data) {
        logs[directory].push("\n");
        logs[directory].push(i);
        logs[directory].push("\n");
      }
    } else {
      logs[directory].push("\n");
      logs[directory].push(i);
      logs[directory].push("\n");
    }
  }
  try {
    //проверяем донора
    const donorStructure = await readDirectoryStructure(
      donorDir
    );
    //проверяем целевую папку
    const targetStructure = await readDirectoryStructure(
      targetDir
    );
    //* logs

    addLog(info, [
      "donorStructure :",
      donorStructure,
      "targetStructure :",
      targetStructure,
    ]);
    // сравниваем данные
    const compare = await compareFolders(
      donorStructure,
      targetStructure
    );
    //*logs
    addLog(info, [
      "Разница файлов :",
      "Отсутствует :",
      compare.missingStructure,
      "Совпадения :",
      compare.matches,
    ]);
    //* Действия:
    // Создание отсутствующего дерева (папки и подпапки):
    const logCreatedStructure = await greatFolderStructure(
      compare.missingStructure.directories,
      targetDir
    );
    //* log
    addLog(info, ["Созданы папки :", logCreatedStructure]);
    // Копирование отсутствующих файлов (в папках и подпапках):
    const logCreatedFiles = await greatFolderStructure(
      compare.missingStructure.files,
      targetDir
    );
    //* log
    addLog(info, ["Созданы файлы :", logCreatedFiles]);
    //! Логи нужные в ТЗ о том что такой фаил уже существует:
    addLog(warn, [
      "Такие файлы уже существуют и не будут заменены :",
      compare.matches.files,
    ]);
    //todo доделать сравнение файлов с предложением замены
  } catch (err) {
    logger.error(`что-то пошло не по плану :`, err);
  }
  return { info: logs.info, warn: logs.warn };
}

const fileSync = {
  async start() {
    try {
      foldersSync("source", "target")
        .then(({ info, warn }) => {
          // logger.info(...info);
          logger.warn(...warn);
          console.log("ready");
        })
        .catch((error) => {
          console.error(
            "что-то пошло не по плану :",
            error
          );
        });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = fileSync;
