import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Post,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import * as _ from "lodash";
import { BookService } from "./book.service";
import { Book } from "./interfaces/book.interface";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Response() res, @Body() body) {
    if (!_.isEmpty(body)) {
      const book: Book = {
        isbn10: body.isbn10,
        isbn13: body.isbn13,
        title: body.title,
        authors: body.authors,
        bookcases: body.bookcases,
        coverImageUrl: body.coverImageUrl,
        categories: body.categories,
        description: body.description,
        releaseAt: body.releaseAt,
        comments: body.comments,
        meta: body.meta,
        hidden: body.hidden,
      };
      await this.bookService.createBook(book);
      res.status(HttpStatus.CREATED).json(book);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }

  @Get()
  async getAllBooks(@Response() res, @Query() query): Promise<any> {
    const books = await this.bookService.findAll(query);
    res.status(HttpStatus.OK).json(books);
  }

  @Get(":id")
  async getBookById(@Response() res, @Param() param): Promise<any> {
    const book = await this.bookService.findById(param.id);
    res.status(HttpStatus.OK).json(book);
  }

  @Post(":id/likes/:pseudo")
  async likeBook(@Response() res, @Param() param): Promise<any> {
    const action = await this.bookService.likeBook(param.id, param.pseudo);
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: `Book ${action}!` });
  }

  @Get("likes/:pseudo")
  async getBookLikedByUser(@Response() res, @Param() param): Promise<any> {
    const books = await this.bookService.findBooksLiked(param.pseudo);
    res.status(HttpStatus.OK).json(books);
  }

  @Post(":id/favorites/:pseudo")
  async addBookToYourFavorites(@Response() res, @Param() param): Promise<any> {
    const action = await this.bookService.addBookToYourFavorites(
      param.id,
      param.pseudo,
    );
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: `Book ${action}!` });
  }

  @Get("favorites/:pseudo")
  async getBookInFavoritesByUser(
    @Response() res,
    @Param() param,
  ): Promise<any> {
    const books = await this.bookService.findBooksInFavorites(param.pseudo);
    res.status(HttpStatus.OK).json(books);
  }

  @Post(":id/comments")
  async commentAnBook(
    @Response() res,
    @Param() param,
    @Body() body,
  ): Promise<any> {
    await this.bookService.commentAnBook(param.id, body.comment);
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: "Book commented!" });
  }
}
