import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { UserService } from "../../src/user/user.service";

describe("Module Auth: ", () => {
  let server;
  let app: INestApplication;
  let userService: UserService;

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
  });

  it("/POST auth/register", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send({
        pseudo: "_test_",
        password: "_test_",
        email: "test@gmail.com",
        profileImageUrl: "img.png",
      })
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
        chai.assert.exists(body.data);
      });
  });

  it("/POST auth/register duplicate", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send({
        pseudo: "_test_",
        password: "_test_",
        email: "test@gmail.com",
        profileImageUrl: "img.png",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);

        await userService.deleteUser("_test_");
      });
  });

  it("/POST auth/login", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
      })
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
        chai.assert.exists(body.data);
      });
  });

  it("/POST auth/login invalid user", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "invalid@invalid.com",
        password: "invalid",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      });
  });

  it("/POST auth/login invalid credential", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: process.env.TEST_EMAIL,
        password: "invalid",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      });
  });

  after(async () => {
    await app.close();
  });
});
