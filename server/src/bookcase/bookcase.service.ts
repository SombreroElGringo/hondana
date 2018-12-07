import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Bookcase } from "./interfaces/bookcase.interface";

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
    return await this.bookcaseModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findByOwner(owner: string): Promise<Bookcase> {
    return await this.bookcaseModel.findOne({
      owner: new Types.ObjectId(owner),
    });
  }

  async addBookInBookcase(id: string, bookId: string, isAvailable: boolean) {
    return await this.bookcaseModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $push: {
          books: {
            bookId: new Types.ObjectId(bookId),
            isAvailable: isAvailable,
          },
        },
      },
    );
  }

  async removeBookFromBookcase(
    id: string,
    bookId: string,
    isAvailable: boolean,
  ) {
    return await this.bookcaseModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $pull: { books: { bookId: bookId, isAvailable: isAvailable } } },
    );
  }

  async changeBookAviability(id: string, bookId: string, isAvailable: boolean) {
    return await this.bookcaseModel.updateOne(
      {
        _id: new Types.ObjectId(id),
        "books.bookId": new Types.ObjectId(bookId),
      },
      { $set: { books: { isAvailable: isAvailable } } },
    );
  }

  async deleteBookcase(owner: string) {
    return await this.bookcaseModel.deleteOne({ owner: owner }).exec();
  }
}
