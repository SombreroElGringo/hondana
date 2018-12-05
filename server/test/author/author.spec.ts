import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { authorsMockup } from "./mockup/author.mockup";
import { AuthorService } from "../../src/author/author.service";

describe("Module Author: ", () => {
  let server;
  let app: INestApplication;
  let authorService: AuthorService;
  let token;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [AuthorService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    authorService = module.get<AuthorService>(AuthorService);

    request
      .agent(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
      })
      .then((res, err) => {
        if (err) throw err;
        token = !res.body ? "" : !res.body.data ? "" : res.body.data.token;
      });
  });

  it("/POST authors", async () => {
    return request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send({
        name: "__Albert Uderzo__",
        biography:
          "Alberto Aleandro Uderzo, est un dessinateur et scénariste de bande dessinée",
        profileImageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Uderzo.jpg/220px-Uderzo.jpg",
      })
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        await authorService.deleteAuthor(body.name);
        chai.assert.isObject(body);
      });
  });

  it("/POST authors without body", async () => {
    return request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
  });

  it("/GET authors", async () => {
    return await request(app.getHttpServer())
      .get("/authors")
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body));
  });

  it("/GET authors?name", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI(`/authors?name=${authorsMockup[0].name}`))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body))
      .expect(({ body }) =>
        chai.assert.equal(authorsMockup[0].name, body[0].name),
      );
  });

  it("/GET authors/:id", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/authors?name=${authorsMockup[0].name}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .get(encodeURI(`/authors/${body[0]._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(authorsMockup[0].name, body.name),
          );
      });
  });

  it("/PUT authors/:id", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/authors?title=${authorsMockup[0].name}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${body[0]._id}`))
          .send({
            name: body[0].name,
            biography: body[0].biography,
            profileImageUrl: body[0].profileImageUrl,
          })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Author edited!", body.message),
          );
      });
  });

  it("/PUT authors/:id without body", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/authors?name=${authorsMockup[0].name}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${body[0]._id}`))
          .expect(HttpStatus.BAD_REQUEST)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Please renseign the body!", body.message),
          );
      });
  });

  it("/PUT authors/:id invalid body", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/authors?name=${authorsMockup[0].name}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${body[0]._id}`))
          .send({
            test: "test",
          })
          .expect(HttpStatus.BAD_REQUEST)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(
              "Please renseign valid parameters!",
              body.message,
            ),
          );
      });
  });

  after(async () => {
    await app.close();
  });
});
