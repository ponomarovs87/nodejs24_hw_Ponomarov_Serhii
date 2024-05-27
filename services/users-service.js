//Абстракция
class UsersBaseSchema {
  userList = [];
  createNewUser(name, surname, birthDate, mail) {
    const user = new UserSchema(
      name,
      surname,
      birthDate,
      mail
    );
    this.addUser(user);
  }
  addUser(user) {
    user._setId(this.userList.length + 1);
    this.userList.push(user);
  }
  getAllUsers() {
    return this.userList.map((user) => ({
      id: user.id,
      fullName: `${user.name} ${user.surname}`,
      age: new Date().getFullYear() -
      new Date(user.birthDate).getFullYear(),
      mail: user.mail,
    }));
  }
}

class UserSchema {
  id;
  constructor(name, surname, birthDate, mail) {
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
    this.mail = mail;
  }
  _setId(id) {
    this.id = id;
  }

}
const user1 = new UserSchema(
  "Vasya",
  "Pupkin",
  "1992-02-26",
  "mail@ukr.net"
);

const usersBase = new UsersBaseSchema();

usersBase.addUser(user1);
usersBase.createNewUser(
  "Masha",
  "Pupkina",
  "1999-02-06",
  "masha@ukr.net"
);
usersBase.createNewUser(
  "Lesha",
  "Dudkin",
  "1985-02-26",
  "lesha@ukr.net"
);
usersBase.createNewUser(
  "Dasdraperma",
  "Koncova",
  "2001-02-26",
  "Dasdra@ukr.net"
);

module.exports = { usersBase };
