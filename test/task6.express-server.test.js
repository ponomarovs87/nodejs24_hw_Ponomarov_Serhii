const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const expect = chai.expect;

const server = require("../server-express");

chai.use(chaiHttp);

//корректируемые данные
const httpMethods = ["get", "post", "put", "delete"];
const blacklist = ["order66", "healthcheck"];
const randomTestCounter = 10;
const charactersAll =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLetters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const charactersNumbers = "0123456789";

function generateRandomString(characters, maxLetters = 50) {
  let length = Math.floor(Math.random() * maxLetters) + 1;
  let result = "";

  const isBlacklisted = (str) =>
    blacklist.some((item) => str.includes(item));

  do {
    result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
  } while (isBlacklisted(result));

  return result;
}

//! Включить при необходимости проверки и измения ендпоинта
// describe("task6(server-express) /user collection", () => {
//   // Test for randomMethod /user
//   for (let i = 0; i < httpMethods.length; i++) {
//     const randomMethod = [httpMethods[i]];
//     if (randomMethod[0] === "post") {
//       it("should return 201 status and 'User created' message", (done) => {
//         const userData = {
//           username: "jonh sMitH",
//           email: "mail2@server.com",
//         };

//         supertest(server)
//           .post("/user")
//           .send(userData)
//           .expect(201)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(201);
//             expect(res.text).to.include("User created");
//             done();
//           });
//       });
//       it(`${randomMethod[0]} /user with missing fields should return 400 status and errors`, (done) => {
//         supertest(server)
//           [randomMethod[0]]("/user")
//           .send({})
//           .expect(400)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.text).to.include("errors");
//             expect(res.text).to.have.include("username");
//             expect(res.text).to.have.include("email");
//             done();
//           });
//       });
//       it(`${randomMethod[0]} /user with missing 'username' fields should return 400 status and errors`, (done) => {
//         supertest(server)
//           [randomMethod[0]]("/user")
//           .send({ email: "mail2@server.com" })
//           .expect(400)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.text).to.include("errors");
//             expect(res.text).to.have.include("username");
//             done();
//           });
//       });
//       it(`${randomMethod[0]} /user with missing 'email' fields should return 400 status and errors`, (done) => {
//         supertest(server)
//           [randomMethod[0]]("/user")
//           .send({ username: "jonh sMitH" })
//           .expect(400)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.text).to.include("errors");
//             expect(res.text).to.have.include("email");
//             done();
//           });
//       });
//       it(`${randomMethod[0]} /user with incorrect fields should return 400 status and errors`, (done) => {
//         supertest(server)
//           [randomMethod[0]]("/user")
//           .send({
//             name: "jonh sMitH",
//             mail: "test@mail.test",
//           })
//           .expect(400)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.text).to.include("errors");
//             expect(res.text).to.have.include("username");
//             expect(res.text).to.have.include("email");
//             done();
//           });
//       });
//     } else {
//       it(`${randomMethod} /user should return 404 status`, (done) => {
//         supertest(server)
//           [httpMethods[i]]("/user")
//           .expect(404)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(404);
//             done();
//           });
//       });
//     }
//   }
// });

describe("task6(server-express) /users collection", () => {
  for (let i = 0; i < httpMethods.length; i++) {
    const randomMethod = [httpMethods[i]];
    if (randomMethod[0] === "get") {
      for (let i = 0; i < randomTestCounter; i++) {
        const validUserId = generateRandomString(
          charactersNumbers
        );
        const invalidUserId = generateRandomString(
          charactersLetters
        );
        const invalidNumberUserId = `${generateRandomString(
          charactersNumbers,
          5
        )}.${generateRandomString(charactersNumbers, 3)}`;
        it(`GET /users/:id should return 200 status and include 'userId: ${validUserId}'`, (done) => {
          // example of a valid userId
          supertest(server)
            [randomMethod[0]](`/users/${validUserId}`)
            .expect(200)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.text).to.include(
                `"userId":"${validUserId}"`
              );
              done();
            });
        });
        it(`${randomMethod[0]} /users/:id with invalid ID should return 400 status and error message`, (done) => {
          supertest(server)
            [randomMethod[0]](`/users/${invalidUserId}`)
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include([
                "Поле должно содержать только цифры",
              ]);
              done();
            });
        });
        it(`${randomMethod[0]} /users/${invalidNumberUserId} with invalidNumber ID should return 400 status and error message`, (done) => {
          supertest(server)
            [randomMethod[0]](
              `/users/${invalidNumberUserId}`
            )
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include(
                "Поле должно быть целым числом"
              );
              done();
            });
        });
        it(`${randomMethod[0]} /users/:id with negative number ID should return 400 status and error message`, (done) => {
          supertest(server)
            [randomMethod[0]](
              `/users/-${invalidNumberUserId}`
            )
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include(
                "значение должно быть позитивным и более 0"
              );
              done();
            });
        });
      }
    } else if (randomMethod[0] === "post") {
      it("should return 201 status and 'User created' message", (done) => {
        const userData = {
          username: "jonh sMitH",
          email: "mail2@server.com",
        };

        supertest(server)
          .post("/users")
          .send(userData)
          .expect(201)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.text).to.include("User created");
            done();
          });
      });
      it(`${randomMethod[0]} /user with missing fields should return 400 status and errors`, (done) => {
        supertest(server)
          [randomMethod[0]]("/users")
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.text).to.include("errors");
            expect(res.text).to.have.include("username");
            expect(res.text).to.have.include("email");
            done();
          });
      });
      it(`${randomMethod[0]} /user with missing 'username' fields should return 400 status and errors`, (done) => {
        supertest(server)
          [randomMethod[0]]("/users")
          .send({ email: "mail2@server.com" })
          .expect(400)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.text).to.include("errors");
            expect(res.text).to.have.include("username");
            done();
          });
      });
      it(`${randomMethod[0]} /user with missing 'email' fields should return 400 status and errors`, (done) => {
        supertest(server)
          [randomMethod[0]]("/users")
          .send({ username: "jonh sMitH" })
          .expect(400)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.text).to.include("errors");
            expect(res.text).to.have.include("email");
            done();
          });
      });
      it(`${randomMethod[0]} /user with incorrect fields should return 400 status and errors`, (done) => {
        supertest(server)
          [randomMethod[0]]("/users")
          .send({
            name: "jonh sMitH",
            mail: "test@mail.test",
          })
          .expect(400)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.text).to.include("errors");
            expect(res.text).to.have.include("username");
            expect(res.text).to.have.include("email");
            done();
          });
      });
    } else if (randomMethod[0] === "delete") {
      for (let i = 0; i < randomTestCounter; i++) {
        const validUserId = generateRandomString(
          charactersNumbers
        );
        const invalidUserId = generateRandomString(
          charactersLetters
        );
        const invalidNumberUserId = `${generateRandomString(
          charactersNumbers,
          5
        )}.${generateRandomString(charactersNumbers, 3)}`;
        it(`${randomMethod[0]} /users/${validUserId} should return 204 status && res.body === empty`, (done) => {
          // example of a valid userId
          supertest(server)
            [randomMethod[0]](`/users/${validUserId}`)
            .expect(204)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(204);
              expect(res.text).to.be.empty;
              done();
            });
        });
        it(`DELETE /users/${invalidUserId} with invalid ID should return 400 status and error message`, (done) => {
          supertest(server)
            .delete(`/users/${invalidUserId}`)
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include([
                "Поле должно содержать только цифры",
              ]);
              done();
            });
        });
        it(`DELETE /users/${invalidNumberUserId} with invalidNumber ID should return 400 status and error message`, (done) => {
          supertest(server)
            .delete(`/users/${invalidNumberUserId}`)
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include(
                "Поле должно быть целым числом"
              );
              done();
            });
        });
        it(`DELETE /users/-${invalidNumberUserId} with negative number ID should return 400 status and error message`, (done) => {
          supertest(server)
            .delete(`/users/-${invalidNumberUserId}`)
            .expect(400)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(400);
              expect(res.text).to.include(
                "значение должно быть позитивным и более 0"
              );
              done();
            });
        });
      }
    } else {
      const validUserId = Math.floor(
        Math.random() * Number.MAX_SAFE_INTEGER
      );
      it(`${randomMethod[0]} /users/${validUserId} should return 404 status`, (done) => {
        // example of a valid userId
        supertest(server)
          [randomMethod[0]](`/users/${validUserId}`)
          .expect(404)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            done();
          });
      });
    }
  }
});
