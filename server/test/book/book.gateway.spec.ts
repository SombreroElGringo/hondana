import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";

import { BookService } from "../../src/book/book.service";
import { BookGateway } from "../../src/book/gateways/book.gateway";

describe("Gateway Book: ", () => {
  let server;
  let app: INestApplication;
  let bookGateway: BookGateway;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [BookService, BookGateway],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    bookGateway = module.get<BookGateway>(BookGateway);
  });

  it("eventGetFiveLastBooks", async () => {
    await bookGateway.eventGetFiveLastBooks(null).then(data => {
      chai.assert.isArray(data);
    });
  });

  it("eventSendFiveLastBooks", async () => {
    await bookGateway.eventSendFiveLastBooks();
  });

  it("identity", async () => {
    await bookGateway.identity(null);
  });

  after(async () => {
    await app.close();
  });
});
