import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User } from "../user/interfaces/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: JwtPayload): Promise<Object> {
    await this.validateUser(payload);
    const token = this.jwtService.sign(payload);
    return {
      expiresIn: 3600,
      token,
    };
  }

  async register(user: User): Promise<Object> {
    try {
      const userInst = await this.userService.createUser(user);
      const payload: JwtPayload = {
        email: userInst.email,
        password: userInst.password,
      };

      const token = this.jwtService.sign(payload);
    
      return {
        expiresIn: 3600,
        token,
      };
    } catch (err) {
      const customError =
        err.code == "11000" ? "User already exist" : "Something went wrong ..";
      throw new Error(customError);
    }
  }

  async validateUser(payload: JwtPayload): Promise<User> {
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
