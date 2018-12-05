import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { UserService } from "../../src/user/user.service";
import { usersMockup } from "./mockup/user.mockup";

describe("Module User: ", () => {
  let server;
  let app: INestApplication;
  let userService: UserService;
  let token;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [UserService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    userService = module.get<UserService>(UserService);

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

  it("/POST users", async () => {
    return await request(app.getHttpServer())
      .post("/users")
      .send({
        pseudo: "_test_",
        password: "_test_",
        email: "test@gmail.com",
        profileImageUrl: "img.png",
      })
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        await userService.deleteUser("_test_");
        chai.assert.isObject(body);
      });
  });

  it("/POST users without body", async () => {
    return await request(app.getHttpServer())
      .post("/users")
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);

        await userService.deleteUser("_test_");
      });
  });

  it("/GET users", async () => {
    return await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isArray(body);
      });
  });

  it("/GET users invalid token", async () => {
    return await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE1NDM4NjE5MjksImV4cCI6MTU0Mzg2NTUyOX0.4Vpz6LOi5W6eScZJyNEOultHsEkVMlSEjBtt8HKEp9U")
      .expect(HttpStatus.UNAUTHORIZED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      });
  });

  it("/GET users unauthorized", async () => {
    return await request(app.getHttpServer())
      .get("/users")
      .expect(HttpStatus.UNAUTHORIZED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      });
  });

  it("/GET users/:id", async () => {
    return await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .get(encodeURI(`/users/${body[0]._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body));
      });
  });

  it("/POST users/:id/comments", async () => {
    return await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .post(encodeURI(`/users/${body[0]._id}/comments`))
          .send({ comment: { message: "Excellent!", rating: 5 } })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body));
      });
  });

  after(async () => {
    await app.close();
  });
});
