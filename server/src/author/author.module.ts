import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { AuthorSchema } from "./models/author.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Author", schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
