const fsAsync = require("fs/promises");
const path = require("path");
const logger = require(process.env.MY_LOGGER)("file_sync");

async function greatFolderStructure(
  foldersArray,
  targetDir
) {
  const logsArray = [];
  for (const item of foldersArray) {
    const newFolderName = path.join(targetDir, item);
    await fsAsync.mkdir(newFolderName);
    logsArray.push(newFolderName);
  }
  return logsArray;
}

async function copyFile(filesArray, donorDir, targetDir) {
  const logsArray = [];
  for (const item of filesArray) {
    const donorFile = path.join(donorDir, item);
    const newFileName = path.join(targetDir, item);
    await fsAsync.copyFile(donorFile, newFileName);
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
  const logs = {};

  function addLog(directories, subDirectory, data) {
    for (const directory of directories) {
      if (!logs[directory]) {
        logs[directory] = {};
      }
      if (!logs[directory][subDirectory]) {
        logs[directory][subDirectory] = {};
      }
      logs[directory][subDirectory] = data;
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
    addLog(["fullInfo"], "donorStructure", donorStructure);
    addLog(
      ["fullInfo"],
      "targetStructure",
      targetStructure
    );
    // сравниваем данные
    const compare = await compareFolders(
      donorStructure,
      targetStructure
    );
    //*logs
    addLog(["info", "fullInfo"], "compare", compare);
    //* Действия:
    // Создание отсутствующего дерева (папки и подпапки):
    const logCreatedStructure = await greatFolderStructure(
      compare.missingStructure.directories,
      targetDir
    );
    //* log
    addLog(
      ["info", "fullInfo"],
      "logCreatedStructure",
      logCreatedStructure
    );
    // Копирование отсутствующих файлов (в папках и подпапках):
    const logCreatedFiles = await copyFile(
      compare.missingStructure.files,
      donorDir,
      targetDir
    );
    //* log
    addLog(
      ["info", "fullInfo"],
      "logCreatedFiles",
      logCreatedFiles
    );
    //! Логи нужные в ТЗ о том что такой фаил уже существует:
    addLog(["warn"], "matchesFiles", compare.matches.files);
    //todo доделать сравнение файлов с предложением замены
  } catch (err) {
    addLog(["Error"], "err", err);
  }
  return logs;
}

const fileSync = {
  async start() {
    foldersSync("source", "target")
      .then(({ err, warn, info }) => {
        if (info.compare.missingStructure.files[0]) {
          logger.info(
            "Отсутствовали файлы :\n",
            info.compare.missingStructure.files
          );
        }
        if (info.compare.missingStructure.directories[0]) {
          logger.info(
            "Отсутствовали директории :\n",
            info.compare.missingStructure.directories
          );
        }
        if (
          !info.compare.missingStructure.files[0] &&
          !info.compare.missingStructure.directories[0]
        ) {
          logger.info("Нечего копировать");
        }
        if (warn.matchesFiles) {
          logger.warn(
            "Совпадения, данные файлы не будут заменены :\n",
            warn.matchesFiles
          );
        }

        if (err) {
          logger.error("Ошибки :\n", err);
        }
      })
      .catch((error) => {
        logger.error("что-то пошло не по плану :", error);
      });
  },
};

module.exports = { fileSync };
