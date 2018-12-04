import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { booksMockup } from "./mockup/book.mockup";
import { BookService } from "../../src/book/book.service";

describe("Module Book: ", () => {
  let server;
  let app: INestApplication;
  let bookService: BookService;
  let token;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [BookService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    bookService = module.get<BookService>(BookService);

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

  it("/POST books", async () => {
    return request(app.getHttpServer())
      .post(encodeURI("/books"))
      .send({
        isbn10: "0000000000",
        isbn13: "0000000000",
        title: "_Testo_Book_",
        authors: [],
        description: "description",
        coverImageUrl:
          "https://images.tandf.co.uk/common/jackets/amazon/978146656/9781466560680.jpg",
        categories: ["Humor"],
        releaseAt: "1967-12-19 23:00:00.000Z",
        comments: [
          {
            message: "Excellent!",
          },
        ],
        meta: {
          favorites: ["testo"],
          likes: ["testo"],
        },
        hidden: false,
      })
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        await bookService.deleteBook(body.isbn10);
        chai.assert.isObject(body);
      });
  });

  it("/POST books without body", async () => {
    return request(app.getHttpServer())
      .post(encodeURI("/books"))
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/);
  });

  it("/GET books", async () => {
    return await request(app.getHttpServer())
      .get("/books")
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body));
  });

  it("/GET books?title", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI(`/books?title=${booksMockup[0].title}`))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body))
      .expect(({ body }) =>
        chai.assert.equal(booksMockup[0].title, body[0].title),
      );
  });

  it("/GET books?categories", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI(`/books?categories=${booksMockup[0].categories[0]}`))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body))
      .expect(({ body }) =>
        chai.assert.equal(booksMockup[0].categories[0], body[0].categories[0]),
      );
  });

  it("/GET books/:id", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/books?title=${booksMockup[0].title}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .get(encodeURI(`/books/${body[0]._id}`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(booksMockup[0].title, body.title),
          );
      });
  });

  it("/POST books/:id/likes/:pseudo", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/books?title=${booksMockup[0].title}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${body[0]._id}/likes/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) => chai.assert.equal("Book liked!", body.message));

        await request(app.getHttpServer())
          .post(encodeURI(`/books/${body[0]._id}/likes/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book unliked!", body.message),
          );
      });
  });

  it("/GET books/likes/:pseudo", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI("/books/likes/test"))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body));
  });

  it("/POST books/:id/favorites/:pseudo", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/books?title=${booksMockup[0].title}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${body[0]._id}/favorites/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book added to your favorites!", body.message),
          );

        await request(app.getHttpServer())
          .post(encodeURI(`/books/${body[0]._id}/favorites/testo`))
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal(
              "Book removed from your favorites!",
              body.message,
            ),
          );
      });
  });

  it("/GET books/favorites/:pseudo", async () => {
    return await request(app.getHttpServer())
      .get(encodeURI("/books/favorites/test"))
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(({ body }) => Array.isArray(body));
  });

  it("/POST books/:id/comments", async () => {
    return request(app.getHttpServer())
      .get(encodeURI(`/books?title=${booksMockup[0].title}`))
      .then(async ({ body }, err) => {
        if (err) throw err;
        await request(app.getHttpServer())
          .post(encodeURI(`/books/${body[0]._id}/comments`))
          .send({
            comment: {message: 'test'},
          })
          .expect(HttpStatus.OK)
          .expect("Content-Type", /json/)
          .expect(({ body }) => chai.assert.isObject(body))
          .expect(({ body }) =>
            chai.assert.equal("Book commented!", body.message),
          );
      });
  });

  after(async () => {
    await app.close();
  });
});
