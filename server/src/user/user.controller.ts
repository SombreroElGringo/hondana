import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from "@nestjs/common";
import * as _ from "lodash";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { User } from "./interfaces/user.interface";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Response() res, @Body() body: User) {
    if (!_.isEmpty(body)) {
      const user: User = {
        pseudo: body.pseudo,
        password: body.password,
        email: body.email,
        profileImageUrl: body.profileImageUrl,
        comments: body.comments,
      };
      await this.userService.createUser(user);
      res.status(HttpStatus.CREATED).json(user);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@Response() res, @Query() query): Promise<any> {
    const users = await this.userService.findAll(query);
    res.status(HttpStatus.OK).json(users);
  }

  @Get(":id")
  async getUserById(@Response() res, @Param() param): Promise<any> {
    const user = await this.userService.findById(param.id);
    res.status(HttpStatus.OK).json(user);
  }

  @Post(":id/comments")
  async commentUser(
    @Response() res,
    @Param() param,
    @Body() body,
  ): Promise<any> {
    await this.userService.commentUser(param.id, body.comment);
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: "User commented!" });
  }
}
