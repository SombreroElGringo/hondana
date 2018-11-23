import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";
import { AuthorModule } from "./author/author.module";
import { BookModule } from "./book/book.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    HelloModule,
    AuthorModule,
    BookModule,
    MongooseModule.forRoot("mongodb://localhost/hondana"),
  ],
})
export class ApplicationModule {}
