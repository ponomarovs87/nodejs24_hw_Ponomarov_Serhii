const fsAsync = require("fs/promises");
const path = require("path");
const logger = require("./utils/logger")("file_sync");

async function greatFolderStructure(foldersArray,targetDir) {
  const logsArray=[]
  for (const item of foldersArray) {
    const folderName = path.basename(item);
    const newFolderName = path.join(targetDir, folderName);
    await fsAsync.mkdir(newFolderName, {
      recursive: true,
    });
    logsArray.push(newFolderName)
  }
  return logsArray
}
async function copyFile(filesArray,targetDir){
  const logsArray=[]
  for (const item of filesArray) {
    const fileName = path.basename(item);
    const newFileName = path.join(targetDir, fileName);
    await fsAsync.copyFile(item,newFileName)
    logsArray.push(newFileName)
  }
  return logsArray
}

async function foldersSync(donorDir, targetDir) {
  const fullDonorDir = path.join(__dirname, donorDir);
  const fullTargetDir = path.join(__dirname, targetDir);
  const logs = [];
  try {
    const targetItems = await fsAsync.readdir(
      fullTargetDir
    );
    const donorItems = await fsAsync.readdir(fullDonorDir);
    let syncArray = [];
    for (let i = 0; i < donorItems.length; i++) {
      if (
        !targetItems.some((item) => item === donorItems[i])
      ) {
        const itemPath = path.join(
          fullDonorDir,
          donorItems[i]
        );
        syncArray.push(itemPath);
      }
    }
    //все папки донора
    const allFoldersDonor = (
      await checkItems(donorItems, {
        dir: donorDir,
      })
    ).syncFoldersArray;

    // если папки одинаковые и нет подпапок донора
    if (
      allFoldersDonor.length === 0 &&
      syncArray.length === 0
    ) {
      return `Папки одинаковые ${fullDonorDir} === ${fullTargetDir}, синхронизации не нужна`;
    }
    //разделение по типам что это
    const syncObjects = await checkItems(syncArray);
    // создание папок
    if (syncObjects.syncFoldersArray.length > 0) {
      await greatFolderStructure(syncObjects.syncFoldersArray,targetDir)
    }
    //копирование файлов
    if (syncObjects.syncFilesArray.length>0) {
      await copyFile(syncObjects.syncFilesArray,targetDir)
    }
    //если есть подпапка у донора
    if (allFoldersDonor.length > 0) {
      for (const item of allFoldersDonor) {
        const folderName = path.basename(item);
        const targetFolder = path.join(targetDir,folderName)
        logs.push(await foldersSync(item, targetFolder));
      }
    }
    //logs
    logs.push(`Необходима синхронизация : \n`, syncObjects);
  } catch (err) {
    logger.error(
      `Ошибка синхронизации папок ${fullDonorDir} => ${fullTargetDir} : \nНепредвиденная ошибка\n`,
      err
    );
  }
  if (logs.length > 0) {
    logger.info(...logs);
  }
}

async function checkItems(syncArray, parameters) {
  const syncFilesArray = [];
  const syncFoldersArray = [];
  const syncOtherArray = [];
  for (let item of syncArray) {
    if (parameters && parameters.dir) {
      item = path.join(parameters.dir, item);
    }
    try {
      const stats = await fsAsync.lstat(item);
      if (stats.isFile()) {
        syncFilesArray.push(item);
      } else if (stats.isDirectory()) {
        syncFoldersArray.push(item);
      } else {
        syncOtherArray.push(item);
      }
    } catch (err) {
      console.error(
        `что-то пошло не по плану ${item}: ${err}`
      );
    }
  }
  return {
    syncFilesArray,
    syncFoldersArray,
    syncOtherArray,
  };
}

foldersSync("source", "target");

const fileSync = {
  async start() {},
};

module.exports = fileSync;
