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
    if (body) {
      const book: Book = {
        isbn10: body.isbn10,
        isbn13: body.isbn13,
        title: body.title,
        authors: body.authors,
        coverImageUrl: body.coverImageUrl,
        categories: body.categories,
        description: body.description,
        releaseAt: body.description,
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
}
