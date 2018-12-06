import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { bookMockup } from "./mockup/book.mockup";

import { BookService } from "../../src/book/book.service";
import { UserService } from "../../src/user/user.service";
import { userAuthMockup } from "../user/mockup/user.mockup";

describe("Module Book: ", () => {
  let server;
  let app: INestApplication;
  let bookService: BookService;
  let userService: UserService;
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
    userService = module.get<UserService>(UserService);

    await userService.createUser(userAuthMockup);
    await request(app.getHttpServer())
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

  it("/POST books", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        await bookService.deleteBook(body.isbn10);
        chai.assert.isObject(body);
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books without body", async () => {
    return request(app.getHttpServer())
      .post(encodeURI("/books"))
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
  });

  it("/GET books", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get("/books")
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body));
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books?title", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI(`/books?title=${bookMockup.title}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body))
          .expect(({ body }) =>
            chai.assert.equal(bookMockup.title, body[0].title),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books?categories", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI(`/books?categories=${bookMockup.categories[0]}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body))
          .expect(({ body }) =>
            chai.assert.equal(bookMockup.categories[0], body[0].categories[0]),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books?categories[]", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI(`/books?categories[]=${bookMockup.categories[0]}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body))
          .expect(({ body }) =>
            chai.assert.equal(bookMockup.categories[0], body[0].categories[0]),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books/:id", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .get(encodeURI(`/books/${book._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) => chai.assert.equal(book.title, body.title));
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books/:id/likes/:pseudo", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${book._id}/likes/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) => chai.assert.equal("Book liked!", body.message));
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books/:id/likes/:pseudo unlike book", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${book._id}/likes/test`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book unliked!", body.message),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books/likes/:pseudo", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI("/books/likes/test"))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body));
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books/:id/favorites/:pseudo", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${book._id}/favorites/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book added to your favorites!", body.message),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books/:id/favorites/:pseudo remove book from favorites", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${book._id}/favorites/test`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(
              "Book removed from your favorites!",
              body.message,
            ),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/GET books/favorites/:pseudo", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        await request(app.getHttpServer())
          .get(encodeURI("/books/favorites/test"))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => Array.isArray(body));
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  it("/POST books/:id/comments", async () => {
    return await request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send(bookMockup)
      .then(async () => {
        const book = await bookService.findByIsbn10(bookMockup.isbn10);
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${book._id}/comments`))
          .send({
            comment: { message: "test" },
          })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book commented!", body.message),
          );
      })
      .then(async () => await bookService.deleteBook(bookMockup.isbn10));
  });

  after(async () => {
    await userService.deleteUser(userAuthMockup.pseudo);
    await app.close();
  });
});
