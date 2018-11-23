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
import { BookService } from "./book.service";
import { Book } from "./models/book.interface";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Response() res, @Body() body) {
    if (!body.initialize) {
      const book: Book = {
        isbn: body.isbn,
        title: body.title,
        author: body.author,
        coverImageUrl: body.coverImageUrl,
        categories: body.categories,
        description: body.description,
        releaseAt: body.description,
        comments: body.comments,
        meta: body.meta,
        hidden: body.hidden,
      };
      await this.bookService.createBook(book);
      res.status(HttpStatus.OK).json(book);
    } else {
      await this.bookService.initializeBooks();
      res
        .status(HttpStatus.OK)
        .json({ msg: "Success the books are initialized in the DB!" });
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
}
