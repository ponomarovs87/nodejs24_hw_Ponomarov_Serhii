const chai = require("chai");
const chaiHttp = require("chai-http");
const supertest = require("supertest");

const should = chai.should();
const expect = chai.expect;

const server = require("../server");

chai.use(chaiHttp);

//корректируемые данные
const httpMethods = ['get', 'post', 'put', 'delete'];
const blacklist = ['order66', 'healthcheck']; 
const randomTestCounter = 10

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = Math.floor(Math.random() * 50) + 1;
    let result = '';
  
    const isBlacklisted = (str) => blacklist.some(item => str.includes(item));
  
    do {
      result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (isBlacklisted(result));
  
    return result;
  }

describe("first test collection", () => {
  it("should return 200 status and healthcheck passed message", (done) => {
    supertest(server)
      .get("/healthcheck")
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          answer: "healthcheck passed",
        });
        done();
      });
  });
  it("should return 404 status", (done) => {
    supertest(server)
      .post("/healthcheck")
      .expect(404)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
  for (let i = 0; i < randomTestCounter; i++) {
    const randomHttpMethod = httpMethods[Math.floor(Math.random() * httpMethods.length)]; 
    it(`should return 404 status from random ${randomHttpMethod} api ${i+1}`, (done) => {
      const randomApi = generateRandomString();
      supertest(server)[randomHttpMethod](`/${randomApi}`) 
        .expect(404)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
        });
    });
  }

  it("test two values", () => {
    //test
    let expectedValue = 10;
    let actualValue = 10;

    expect(actualValue).to.be.equal(expectedValue);
  });
});
