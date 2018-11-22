import { INestApplication, HttpStatus } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import { ApplicationModule } from "../../src/app.module";

const mockup = [
  {
    recordId: "77625ec99fe0be8bc11f4ebb72a3cb49b78f7d8c",
    libelle_gare: "Les Deux Jumeaux",
    departement: "Pyrénées-Atlantiques",
    commune: "Hendaye",
    code_ligne: "655000",
    coordonnees_geographiques: [43.369975296739035, -1.7643241387888209],
  },
  {
    recordId: "ce06b77185e31496de0c0bf567e7bca39ee835c3",
    libelle_gare: "Hendaye",
    departement: "Pyrénées-Atlantiques",
    commune: "Hendaye",
    code_ligne: "655000",
    coordonnees_geographiques: [43.35333854320818, -1.7821121201225476],
  },
];

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

  afterEach(async () => {
    await app.close();
  });
});
