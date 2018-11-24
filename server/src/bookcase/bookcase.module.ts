import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookcaseController } from "./bookcase.controller";
import { BookcaseService } from "./bookcase.service";
import { BookcaseSchema } from "./models/bookcase.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Bookcase", schema: BookcaseSchema }]),
  ],
  controllers: [BookcaseController],
  providers: [BookcaseService],
  exports: [BookcaseService],
})
export class BookcaseModule {}
