import { INestApplication, HttpStatus } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import { ApplicationModule } from "../../src/app.module";

describe("Module incident", () => {
  let server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    app.connectMicroservice({
      transport: Transport.TCP,
    });
    await app.startAllMicroservicesAsync();
    await app.init();
  });

  it(`/GET (/incident)`, () => {
    return request(server)
      .get("/incident")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it(`/GET (/incident?query)`, () => {
    return request(server)
      .get("/incident?sort=date&refine.date=2018/09/29")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it(`/GET (/incidents)`, () => {
    return request(server)
      .get("/incidents")
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: 404,
        error: "Not Found",
        message: "Cannot GET /incidents",
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
