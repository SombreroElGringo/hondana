import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookcaseController } from "./bookcase.controller";
import { BookcaseService } from "./bookcase.service";
import { BookcaseSchema } from "./models/bookcase.schema";
import { BookSchema } from "../book/models/book.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Bookcase", schema: BookcaseSchema }]),
    MongooseModule.forFeature([{ name: "Book", schema: BookSchema }]),
  ],
  controllers: [BookcaseController],
  providers: [BookcaseService],
  exports: [BookcaseService],
})
export class BookcaseModule {}
