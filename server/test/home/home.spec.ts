import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import * as dotenv from "dotenv";
import "mocha";
import { HomeModule } from "../../src/home/home.module";

dotenv.config();

describe("Module Home: ", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("/GET home", async () => {
    return await request(app.getHttpServer())
      .get("/")
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect({
        docs: "http://localhost:5000/api/v1/docs",
        message: "Hello welcome on the Hondana API!",
        status: 200,
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
