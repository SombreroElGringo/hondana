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
import { UserService } from "./user.service";
import { User } from "./models/user.interface";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Response() res, @Body() body) {
    if (!body.initialize) {
      const user: User = {
        pseudo: body.name,
        password: body.password,
        email: body.email,
        profileImageUrl: body.profileImageUrl,
        comments: body.comments,
      };
      await this.userService.createUser(user);
      res.status(HttpStatus.OK).json(user);
    } else {
      await this.userService.initializeUsers();
      res
        .status(HttpStatus.OK)
        .json({ msg: "Success the users are initialized in the DB!" });
    }
  }

  @Get()
  async getAllUsers(@Response() res, @Query() query): Promise<any> {
    const users = await this.userService.findAll();
    res.status(HttpStatus.OK).json(users);
  }

  @Get(":id")
  async getUserById(@Response() res, @Param() param): Promise<any> {
    const user = await this.userService.findById(param.id);
    res.status(HttpStatus.OK).json(user);
  }
}
