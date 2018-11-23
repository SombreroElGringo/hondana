import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";
import { AuthorModule } from "./author/author.module";
import { BookModule } from "./book/book.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { BookcaseModule } from "./bookcase/bookcase.module";

@Module({
  imports: [
    HelloModule,
    AuthorModule,
    BookModule,
    BookcaseModule,
    UserModule,
    MongooseModule.forRoot("mongodb://localhost/hondana"),
  ],
})
export class ApplicationModule {}
