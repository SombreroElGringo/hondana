import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookSchema } from "./models/book.schema";
import { BookGateway } from "./gateways/book.gateway";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Book", schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookGateway],
  exports: [BookService, BookGateway],
})
export class BookModule {}
