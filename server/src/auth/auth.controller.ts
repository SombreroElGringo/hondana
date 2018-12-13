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
    const PARAMS = ["email", "password"];
    const errors = [];
    PARAMS.map(param => {
      const error = this.validateParams(body, param);
      if (error !== true) errors.push(error);
    });

    if (errors.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: errors,
      });
    }

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
    const PARAMS = ["email", "pseudo", "password", "confirmPassword"];
    const errors = [];
    PARAMS.map(param => {
      const error = this.validateParams(body, param);
      if (error !== true) errors.push(error);
    });

    if (errors.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: errors,
      });
    }

    const user: User = {
      pseudo: body.pseudo,
      password: body.password,
      email: body.email,
      profileImageUrl:
        body.profileImageUrl || body.profileImageUrl === ""
          ? body.profileImageUrl
          : "https://picsum.photos/200/300/?random",
      comments: body.comments ? body.comments : [],
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
  }

  private validateParams(body, param: string) {
    if (!body[param] || body[param] === "") {
      return {
        param: param,
        message: `${param} is not valid!`,
      };
    } else if (body[param] && body[param] !== "") {
      if (param === "confirmPassword") {
        if (!body["password"] || body["confirmPassword"] !== body["password"]) {
          return {
            param: param,
            message: `${param} do not match!`,
          };
        }
      }
    }
    return true;
  }
}
