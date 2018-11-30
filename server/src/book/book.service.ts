import { Model, Types } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./interfaces/book.interface";

@Injectable()
export class BookService {
  constructor(@InjectModel("Book") private readonly bookModel: Model<Book>) {}

  async createBook(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async findAll(@Query() query?): Promise<Book[]> {
    if (query) {
      const actionQueries = {};
      if (query.categories) {
        const arrOfCategories = Array.isArray(query.categories)
          ? query.categories
          : query.categories.split(",");
        actionQueries["categories"] = { $in: arrOfCategories };
      }

      if (query.title) {
        actionQueries["title"] = {
          $regex: query.title,
          $options: "i",
        };
      }
      return await this.bookModel.find(actionQueries).exec();
    } else {
      return await this.bookModel.find().exec();
    }
  }

  async findById(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }

  async search(title: string): Promise<Book[]> {
    return await this.bookModel.find({ $text: { $search: title } }).exec();
  }

  async likeBook(id: string, pseudo: string): Promise<string> {
    const book: Book = await this.bookModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();

    const actionQuery =
      book.meta.likes.indexOf(pseudo) === -1
        ? { $push: { "meta.likes": pseudo } }
        : { $pull: { "meta.likes": pseudo } };
    const action = book.meta.likes.indexOf(pseudo) === -1 ? "liked" : "unliked";

    await this.bookModel
      .updateOne({ _id: new Types.ObjectId(id) }, actionQuery)
      .exec();
    return action;
  }

  async findBooksLiked(pseudo: string): Promise<Book[]> {
    return await this.bookModel
      .find({ "meta.likes": pseudo })
      .sort("-date")
      .exec();
  }

  async addBookToYourFavorites(id: string, pseudo: string): Promise<string> {
    const book: Book = await this.bookModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();

    const actionQuery =
      book.meta.favorites.indexOf(pseudo) === -1
        ? { $push: { "meta.favorites": pseudo } }
        : { $pull: { "meta.favorites": pseudo } };
    const action =
      book.meta.favorites.indexOf(pseudo) === -1
        ? "added to your favorites"
        : "removed from your favorites";

    await this.bookModel
      .update({ _id: new Types.ObjectId(id) }, actionQuery)
      .exec();
    return action;
  }

  async findBooksInFavorites(pseudo: string): Promise<Book[]> {
    return await this.bookModel
      .find({ "meta.favorites": pseudo })
      .sort("-date")
      .exec();
  }

  async commentAnBook(id: string, comment: object) {
    return await this.bookModel.update(
      { _id: new Types.ObjectId(id) },
      { $push: { comments: comment } },
    );
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
