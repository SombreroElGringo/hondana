import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { bookBookcaseMockup } from "../book/mockup/book.mockup";
import { BookService } from "../../src/book/book.service";
import { userBookcaseMockup } from "../user/mockup/user.mockup";
import { UserService } from "../../src/user/user.service";
import { BookcaseService } from "../../src/bookcase/bookcase.service";

describe("Module Bookcase: ", () => {
  let server;
  let app: INestApplication;
  let bookService: BookService;
  let bookcaseService: BookcaseService;
  let userService: UserService;
  let book;
  let user;
  let token;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [BookService, UserService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    bookService = module.get<BookService>(BookService);
    bookcaseService = module.get<BookcaseService>(BookcaseService);
    userService = module.get<UserService>(UserService);

    await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookBookcaseMockup);

    await request(app.getHttpServer())
      .post(encodeURI("/users"))
      .send(userBookcaseMockup);

    user = await userService.findByPseudo(userBookcaseMockup.pseudo);

    book = await bookService.findByIsbn10(bookBookcaseMockup.isbn10);
  });

  it("/POST bookcases", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/bookcases"))
      .send({
        owner: user._id,
        books: [book._id],
        coordinate: {
          latitude: "35.971338",
          longitude: "139.471432",
        },
      })
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .then(async () => await bookcaseService.deleteBookcase(user._id));
  });

  it("/POST bookcases without body", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/bookcases"))
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
  });

  it("/GET bookcases", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI("/bookcases"))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isArray(body);
      });
  });

  it("/GET bookcases/:id", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/bookcases"))
      .send({
        owner: user._id,
        books: [book._id],
      })
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI("/bookcases"))
          .then(async ({ body }, err) => {
            if (err) throw err;
            await request(app.getHttpServer())
              .get(encodeURI(`/bookcases/${body[0]._id}`))
              .expect(HttpStatus.OK)
              .expect("Content-Type", /json/)
              .expect(({ body }) => chai.assert.isObject(body));
          });
      })
      .then(() => bookcaseService.deleteBookcase(user._id));
  });

  it("/POST bookcases/:id/book/:bookId", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/bookcases"))
      .send({
        owner: user._id,
        books: [],
      })
      .then(async () => {
        const bookcase = await bookcaseService.findByOwner(user._id);
        await request(app.getHttpServer())
          .post(encodeURI(`/bookcases/${bookcase._id}/book/${book._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/);
      })
      .then(async () => await bookcaseService.deleteBookcase(user._id));
  });

  it("/DELETE bookcases/:id/book/:bookId", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/bookcases"))
      .send({
        owner: user._id,
        books: [book._id],
      })
      .then(async () => {
        const bookcase = await bookcaseService.findByOwner(user._id);
        await request(app.getHttpServer())
          .delete(encodeURI(`/bookcases/${bookcase._id}/book/${book._id}`))
          .send({
            isAvailable: true,
          })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/);
      })
      .then(async () => await bookcaseService.deleteBookcase(user._id));
  });

  after(async () => {
    await userService.deleteUser(userBookcaseMockup.pseudo);
    await bookService.deleteBook(bookBookcaseMockup.isbn10);
    await app.close();
  });
});
