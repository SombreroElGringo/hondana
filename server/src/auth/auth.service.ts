import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/models/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: JwtPayload): Promise<string> {
    await this.checkUser(payload);
    return this.jwtService.sign(payload);
  }

  async register(user: User): Promise<string> {
    try {
      const userInst = await this.userService.createUser(user);
      const payload: JwtPayload = {
        email: userInst.email,
        password: userInst.password,
      };
      return this.jwtService.sign(payload);
    } catch (err) {
      const customError =
        err.code == "11000" ? "User already exist" : "Something went wrong ..";
      throw new Error(customError);
    }
  }

  async checkUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findByEmail(payload.email);
    if (user) {
      const compare = await bcrypt.compare(payload.password, user.password);
      if (!compare) {
        throw new Error("Invalid credential");
      }
      return user;
    } else {
      throw new Error("Invalid credential");
    }
  }
}
