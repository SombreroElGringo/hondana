import { Controller, Post, Body, Response, HttpStatus } from "@nestjs/common";
import * as _ from "lodash";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/interfaces/user.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Response() res, @Body() body): Promise<any> {
    const user: JwtPayload = {
      email: body.email,
      password: body.password,
    };
    try {
      const token = await this.authService.login(user);
      res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: token });
    } catch (err) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: HttpStatus.BAD_REQUEST, message: err.message });
    }
  }

  @Post("register")
  async register(@Response() res, @Body() body): Promise<any> {
    if (!_.isEmpty(body)) {
      const user: User = {
        pseudo: body.pseudo,
        password: body.password,
        email: body.email,
        profileImageUrl: body.profileImageUrl,
        comments: body.comments,
      };
      try {
        const token = await this.authService.register(user);
        res
          .status(HttpStatus.CREATED)
          .json({ status: HttpStatus.CREATED, data: token });
      } catch (err) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ status: HttpStatus.BAD_REQUEST, message: err.message });
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }
}
