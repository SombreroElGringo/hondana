import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Bookcase } from "./interfaces/bookcase.interface";
import { Book } from "./interfaces/book.interface";

@Injectable()
export class BookcaseService {
  constructor(
    @InjectModel("Bookcase") private readonly bookcaseModel: Model<Bookcase>,
    @InjectModel("Book") private readonly bookModel: Model<Book>,
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

  async addBookInBookcase(id: string, bookId: string) {
    await this.bookModel.updateOne(
      { _id: new Types.ObjectId(bookId) },
      {
        $addToSet: {
          bookcases: new Types.ObjectId(id),
        },
      },
    );
    return await this.bookcaseModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $addToSet: {
          books: new Types.ObjectId(bookId),
        },
      },
    );
  }

  async editBookcaseCoordinate(id: string, coordinate: object) {
    return await this.bookcaseModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          coordinate: coordinate,
        },
      },
    );
  }

  async removeBookFromBookcase(id: string, bookId: string) {
    await this.bookModel.updateOne(
      { _id: new Types.ObjectId(bookId) },
      {
        $set: {
          bookcases: id,
        },
      },
    );
    return await this.bookcaseModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $pull: { books: bookId } },
    );
  }

  async deleteBookcase(owner: string) {
    return await this.bookcaseModel.deleteOne({ owner: owner }).exec();
  }
}
