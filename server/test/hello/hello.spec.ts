import { INestApplication } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import { ApplicationModule } from "../../src/app.module";

describe("RPC transport", () => {
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

  it(`/GET`, () => {
    return request(server)
      .get("/hello")
      .expect(200, "Hello World!");
  });

  afterEach(async () => {
    await app.close();
  });
});
