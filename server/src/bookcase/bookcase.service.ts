import { Model, ObjectId } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { Bookcase } from "./models/bookcase.interface";

@Injectable()
export class BookcaseService {
  constructor(
    @InjectModel("Bookcase") private readonly bookcaseModel: Model<Bookcase>,
  ) {}

  async createBookcase(bookcase: Bookcase): Promise<Bookcase> {
    const createdBookcase = new this.bookcaseModel(bookcase);
    return await createdBookcase.save();
  }

  async findAll(): Promise<Bookcase[]> {
    return await this.bookcaseModel.find().exec();
  }

  async findById(id: string): Promise<Bookcase> {
    return await this.bookcaseModel.findOne({ _id: new ObjectId(id) });
  }

  async addBookInBookcase(id: string, bookId: string, isAvailable: boolean) {
    return await this.bookcaseModel.update(
      { _id: new ObjectId(id) },
      { $push: { books: { bookId: bookId, isAvailable: isAvailable } } },
    );
  }

  async removeBookFromBookcase(
    id: string,
    bookId: string,
    isAvailable: boolean,
  ) {
    return await this.bookcaseModel.update(
      { _id: new ObjectId(id) },
      { $pull: { books: { bookId: bookId, isAvailable: isAvailable } } },
    );
  }

  async changeBookAviability(id: string, bookId: string, isAvailable: boolean) {
    return await this.bookcaseModel.update(
      { _id: new ObjectId(id), "books.bookId": new ObjectId(bookId) },
      { $set: { books: { isAvailable: isAvailable } } },
    );
  }

  async initializeBookcases(bookcase: Bookcase) {
    return await this.createBookcase(bookcase);
  }

  async cleanBookcase() {
    return await this.bookcaseModel.deleteMany().exec();
  }
}
