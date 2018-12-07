import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { BookcaseModule } from "../bookcase/bookcase.module";

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
    BookcaseModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
