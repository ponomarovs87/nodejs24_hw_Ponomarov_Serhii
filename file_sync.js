const fsAsync = require("fs/promises");
const path = require("path");

const fileSync = {
  async start() {
    // пути
    const target = path.join(__dirname, "target");
    const source = path.join(__dirname, "source");
    const targetItems = await fsAsync.readdir(target);
    const sourceItems = await fsAsync.readdir(source);
    //сравнение массивов по елементам и получем новый массив с елементами которых нет
    let newArray = [];
    for (let i = 0; i < targetItems.length; i++) {
      let found = false;
      for (let x = 0; x < sourceItems.length; x++) {
        if (targetItems[i] === sourceItems[x]) {
          found = true;
          break;
        }
      }
      if (!found) {
        newArray.push(targetItems[i]);
      }
    }
    console.log(newArray);
    // выясняем фаил ли это
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i]) {
        console.log(true);
      }
    }
    // попробуем
    console.log(target);
    await fsAsync.cp("./target/", "./source/", {
      force: false,
      recursive: true,
    });
  },
};

module.exports = fileSync;
