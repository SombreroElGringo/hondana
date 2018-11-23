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
import { BookcaseService } from "./bookcase.service";
import { Bookcase } from "./models/bookcase.interface";

@Controller("bookcases")
export class BookcaseController {
  constructor(private readonly bookcaseService: BookcaseService) {}

  @Post()
  async createBookcase(@Response() res, @Body() body) {
    if (body) {
      const bookcase: Bookcase = {
        owner: body.owner,
        books: body.books,
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
  async getAllBookcases(@Response() res, @Query() query): Promise<any> {
    const bookcases = await this.bookcaseService.findAll();
    res.status(HttpStatus.OK).json(bookcases);
  }

  @Get(":id")
  async getBookcaseById(@Response() res, @Param() param): Promise<any> {
    const bookcase = await this.bookcaseService.findById(param.id);
    res.status(HttpStatus.OK).json(bookcase);
  }
}
