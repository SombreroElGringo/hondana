import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { authorMockup } from "./mockup/author.mockup";
import { AuthorService } from "../../src/author/author.service";
import { UserService } from "../../src/user/user.service";
import { userAuthMockup } from "../user/mockup/user.mockup";

describe("Module Author: ", () => {
  let server;
  let app: INestApplication;
  let authorService: AuthorService;
  let userService: UserService;
  let token;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [AuthorService, UserService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    authorService = module.get<AuthorService>(AuthorService);
    userService = module.get<UserService>(UserService);

    await userService.createUser(userAuthMockup);
    await request
      .agent(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: userAuthMockup.email,
        password: userAuthMockup.password,
      })
      .then((res, err) => {
        if (err) throw err;
        token = !res.body ? "" : !res.body.data ? "" : res.body.data.token;
      });
  });

  it("/POST authors", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/POST authors without body", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
  });

  it("/GET authors", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get("/authors")
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body));
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/GET authors?name", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI(`/authors?name=${authorMockup.name}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body))
          .expect(({ body }) =>
            chai.assert.equal(authorMockup.name, body[0].name),
          );
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/GET authors/:id", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        const author = await authorService.findByName(authorMockup.name);
        await request(app.getHttpServer())
          .get(encodeURI(`/authors/${author._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(authorMockup.name, body.name),
          );
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/PUT authors/:id", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        const author = await authorService.findByName(authorMockup.name);
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${author._id}`))
          .send({
            name: authorMockup.name,
            biography: authorMockup.biography,
            profileImageUrl: authorMockup.profileImageUrl,
          })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Author edited!", body.message),
          );
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/PUT authors/:id without body", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        const author = await authorService.findByName(authorMockup.name);
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${author._id}`))
          .expect(HttpStatus.BAD_REQUEST)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Please renseign the body!", body.message),
          );
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  it("/PUT authors/:id invalid body", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/authors"))
      .send(authorMockup)
      .then(async () => {
        const author = await authorService.findByName(authorMockup.name);
        await request(app.getHttpServer())
          .put(encodeURI(`/authors/${author._id}`))
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
      })
      .then(async () => authorService.deleteAuthor(authorMockup.name));
  });

  after(async () => {
    await userService.deleteUser(userAuthMockup.pseudo);
    await app.close();
  });
});
