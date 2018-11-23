import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { UserService } from "../user/user.service";
import { BookService } from "../book/book.service";
import { BookcaseService } from "../bookcase/bookcase.service";
import { AuthorService } from "../author/author.service";
import { AuthorModule } from "../author/author.module";
import { BookModule } from "../book/book.module";
import { BookcaseModule } from "../bookcase/bookcase.module";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [HomeController],
  providers: [AuthorService, BookService, BookcaseService, UserService],
  imports: [AuthorModule, BookModule, BookcaseModule, UserModule],
})
export class HomeModule {}
