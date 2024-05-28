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

const myUniversalTest = ({
  testName,
  method,
  endpoint,
  requestData,
  expectCode,
  expects
}) => {
  it(testName, (done) => {
    const request = supertest(server)[method](endpoint);
    
    if (requestData) {
      request.send(requestData);
    }
    
    request.expect(expectCode).end((err, res) => {
      expects.forEach(expectFn => expectFn(err, res));
      done();
    });
  });
};


describe("task6(server-express) /users collection", () => {
  for (let i = 0; i < httpMethods.length; i++) {
    const method = httpMethods[i];
    
    if (method === "get") {
      for (let i = 0; i < randomTestCounter; i++) {
        const validUserId = generateRandomString(charactersNumbers);
        const invalidUserId = generateRandomString(charactersLetters);
        const invalidNumberUserId = `${generateRandomString(charactersNumbers, 5)}.${generateRandomString(charactersNumbers, 3)}`;
        
        myUniversalTest({
          testName: `GET /users/:id should return 200 status and include 'userId: ${validUserId}'`,
          method,
          endpoint: `/users/${validUserId}`,
          expectCode: 200,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(200),
            (err, res) => expect(res.text).to.include(`"userId":"${validUserId}"`)
          ]
        });

        myUniversalTest({
          testName: `GET /users/:id with invalid ID should return 400 status and error message`,
          method,
          endpoint: `/users/${invalidUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("Поле должно содержать только цифры")
          ]
        });

        myUniversalTest({
          testName: `GET /users/${invalidNumberUserId} with invalidNumber ID should return 400 status and error message`,
          method,
          endpoint: `/users/${invalidNumberUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("Поле должно быть целым числом")
          ]
        });

        myUniversalTest({
          testName: `GET /users/-${invalidNumberUserId} with negative number ID should return 400 status and error message`,
          method,
          endpoint: `/users/-${invalidNumberUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("значение должно быть позитивным и более 0")
          ]
        });
      }
    } else if (method === "post") {
      myUniversalTest({
        testName: `POST /users should return 201 status and 'User created' message`,
        method,
        endpoint: `/users`,
        requestData: { username: "jonh sMitH", email: "mail2@server.com" },
        expectCode: 201,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(201),
          (err, res) => expect(res.text).to.include("User created")
        ]
      });

      myUniversalTest({
        testName: `POST /users with missing fields should return 400 status and errors`,
        method,
        endpoint: `/users`,
        requestData: {},
        expectCode: 400,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(400),
          (err, res) => expect(res.text).to.include("errors"),
          (err, res) => expect(res.text).to.include("username"),
          (err, res) => expect(res.text).to.include("email")
        ]
      });

      myUniversalTest({
        testName: `POST /users with missing 'username' fields should return 400 status and errors`,
        method,
        endpoint: `/users`,
        requestData: { email: "mail2@server.com" },
        expectCode: 400,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(400),
          (err, res) => expect(res.text).to.include("errors"),
          (err, res) => expect(res.text).to.include("username")
        ]
      });

      myUniversalTest({
        testName: `POST /users with missing 'email' fields should return 400 status and errors`,
        method,
        endpoint: `/users`,
        requestData: { username: "jonh sMitH" },
        expectCode: 400,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(400),
          (err, res) => expect(res.text).to.include("errors"),
          (err, res) => expect(res.text).to.include("email")
        ]
      });

      myUniversalTest({
        testName: `POST /users with incorrect fields should return 400 status and errors`,
        method,
        endpoint: `/users`,
        requestData: { name: "jonh sMitH", mail: "test@mail.test" },
        expectCode: 400,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(400),
          (err, res) => expect(res.text).to.include("errors"),
          (err, res) => expect(res.text).to.include("username"),
          (err, res) => expect(res.text).to.include("email")
        ]
      });
    } else if (method === "delete") {
      for (let i = 0; i < randomTestCounter; i++) {
        const validUserId = generateRandomString(charactersNumbers);
        const invalidUserId = generateRandomString(charactersLetters);
        const invalidNumberUserId = `${generateRandomString(charactersNumbers, 5)}.${generateRandomString(charactersNumbers, 3)}`;

        myUniversalTest({
          testName: `DELETE /users/${validUserId} should return 204 status and res.body === empty`,
          method,
          endpoint: `/users/${validUserId}`,
          expectCode: 204,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(204),
            (err, res) => expect(res.text).to.be.empty
          ]
        });

        myUniversalTest({
          testName: `DELETE /users/${invalidUserId} with invalid ID should return 400 status and error message`,
          method,
          endpoint: `/users/${invalidUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("Поле должно содержать только цифры")
          ]
        });

        myUniversalTest({
          testName: `DELETE /users/${invalidNumberUserId} with invalidNumber ID should return 400 status and error message`,
          method,
          endpoint: `/users/${invalidNumberUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("Поле должно быть целым числом")
          ]
        });

        myUniversalTest({
          testName: `DELETE /users/-${invalidNumberUserId} with negative number ID should return 400 status and error message`,
          method,
          endpoint: `/users/-${invalidNumberUserId}`,
          expectCode: 400,
          expects: [
            (err, res) => expect(err).to.be.null,
            (err, res) => expect(res).to.have.status(400),
            (err, res) => expect(res.text).to.include("значение должно быть позитивным и более 0")
          ]
        });
      }
    } else {
      const validUserId = generateRandomString(charactersNumbers);

      myUniversalTest({
        testName: `${method.toUpperCase()} /users/${validUserId} should return 404 status`,
        method,
        endpoint: `/users/${validUserId}`,
        expectCode: 404,
        expects: [
          (err, res) => expect(err).to.be.null,
          (err, res) => expect(res).to.have.status(404)
        ]
      });
    }
  }
});

