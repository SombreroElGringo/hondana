import { INestApplication, HttpStatus } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import { ApplicationModule } from "../../src/app.module";

const mockup = [];

describe("Module stations", () => {
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
  /*
  it(`/GET (/stations)`, () => {
    return request(server)
      .get("/stations")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it(`/GET (/stations?query)`, () => {
    return request(server)
      .get("/stations?q=Hendaye")
      .expect("Content-Type", /json/)
      .expect(200, mockup);
  });

  it(`/GET (/stations)`, () => {
    return request(server)
      .get("/stationss")
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: 404,
        error: "Not Found",
        message: "Cannot GET /stationss",
      });
  });
*/
  afterEach(async () => {
    await app.close();
  });
});
