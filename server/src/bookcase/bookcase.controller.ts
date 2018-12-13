import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Post,
  Body,
  Param,
  Delete,
} from "@nestjs/common";
import * as _ from "lodash";
import { BookcaseService } from "./bookcase.service";
import { Bookcase } from "./interfaces/bookcase.interface";

@Controller("bookcases")
export class BookcaseController {
  constructor(private readonly bookcaseService: BookcaseService) {}

  @Post()
  async createBookcase(@Response() res, @Body() body) {
    if (!_.isEmpty(body)) {
      const bookcase: Bookcase = {
        owner: body.owner,
        books: body.books,
        coordinate: body.coordinate,
      };
      await this.bookcaseService.createBookcase(bookcase);
      res.status(HttpStatus.CREATED).json(bookcase);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }

  @Get()
  async getAllBookcases(@Response() res): Promise<any> {
    const bookcases = await this.bookcaseService.findAll();
    res.status(HttpStatus.OK).json(bookcases);
  }

  @Get(":id")
  async getBookcaseById(@Response() res, @Param() param): Promise<any> {
    const bookcase = await this.bookcaseService.findById(param.id);
    res.status(HttpStatus.OK).json(bookcase);
  }

  @Post(":id/book/:bookId")
  async addBookInBookcase(@Response() res, @Param() param): Promise<any> {
    await this.bookcaseService.addBookInBookcase(param.id, param.bookId);
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: "Book added in the Bookcase!" });
  }

  @Delete(":id/book/:bookId")
  async removeBookFromBookcase(@Response() res, @Param() param): Promise<any> {
    await this.bookcaseService.removeBookFromBookcase(param.id, param.bookId);
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Book removed from the Bookcase!",
    });
  }
}
