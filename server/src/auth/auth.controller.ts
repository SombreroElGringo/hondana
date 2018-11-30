import { Controller, Post, Body, Response, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/models/user.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Response() res, @Body() body): Promise<any> {
    const user: JwtPayload = {
      email: body.email,
      password: body.password,
    };
    const token = await this.authService.login(user);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, token: token });
  }

  @Post("register")
  async register(@Response() res, @Body() body): Promise<any> {
    const user: User = {
      pseudo: body.pseudo,
      password: body.password,
      email: body.email,
      profileImageUrl: body.profileImageUrl,
      comments: body.comments,
    };
    const token = await this.authService.register(user);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, token: token });
  }
}
