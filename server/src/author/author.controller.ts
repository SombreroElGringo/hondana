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
import { AuthorService } from "./author.service";
import { Author } from "./models/author.interface";

@Controller("authors")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async createAuthor(@Response() res, @Body() body) {
    if (!body.initialize) {
      const author: Author = {
        name: body.name,
        biography: body.biography,
        profileImageUrl: body.profileImageUrl,
      };
      await this.authorService.createAuthor(author);
      res.status(HttpStatus.OK).json(author);
    } else {
      await this.authorService.initializeAuthors();
      res
        .status(HttpStatus.OK)
        .json({ msg: "Success the authors are initialized in the DB!" });
    }
  }

  @Get()
  async getAllAuthors(@Response() res, @Query() query): Promise<any> {
    const authors = await this.authorService.findAll();
    res.status(HttpStatus.OK).json(authors);
  }

  @Get(":id")
  async getAuthorById(@Response() res, @Param() param): Promise<any> {
    const author = await this.authorService.findById(param.id);
    res.status(HttpStatus.OK).json(author);
  }
}
