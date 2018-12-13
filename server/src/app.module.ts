import { Module } from "@nestjs/common";
import { HomeModule } from "./home/home.module";
import { AuthorModule } from "./author/author.module";
import { BookModule } from "./book/book.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { BookcaseModule } from "./bookcase/bookcase.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    AuthorModule,
    BookModule,
    BookcaseModule,
    UserModule,
    HomeModule,
    MongooseModule.forRoot("mongodb://localhost/hondana", {
      useNewUrlParser: true,
    }),
  ],
})
export class ApplicationModule {}
