import { Model, ObjectId } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./models/book.interface";

@Injectable()
export class BookService {
  constructor(@InjectModel("Book") private readonly bookModel: Model<Book>) {}

  async createBook(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async findAll(@Query() query): Promise<Book[]> {
    return await this.bookModel.find(query).exec();
  }

  async findById(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: new ObjectId(id) }).exec();
  }

  async search(title: string): Promise<Book[]> {
    return await this.bookModel.find({ $text: { $search: title } }).exec();
  }

  async initializeBooks(books: Book[]) {
    return await books.map(book => {
      this.createBook(book);
    });
  }

  async cleanBooks() {
    return await this.bookModel.deleteMany().exec();
  }
}
