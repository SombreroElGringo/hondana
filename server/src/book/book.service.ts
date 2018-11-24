import { Model, ObjectId } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import _ from "lodash";
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

  async likeBook(id: string, pseudo: string): Promise<string> {
    const book: Book = await this.bookModel.findOne({ _id: new ObjectId(id) }).exec();

    const actionQuery = _.indexOf(book.meta.likes, pseudo) === -1 ? {$push: {likes: pseudo}} : {$pull: {likes: pseudo}};
    const action = _.indexOf(book.meta.likes, pseudo) === -1 ? 'liked' : 'unliked';

    await this.bookModel.update({_id: new ObjectId(id)}, actionQuery).exec();
    return action;
  }

  async findBooksLiked(pseudo: string): Promise<Book[]> {
    return await this.bookModel.find({"meta.likes": pseudo}).sort('-date').exec();
  }

  async addBookToYourFavorites(id: string, pseudo: string): Promise<string> {
    const book: Book = await this.bookModel.findOne({ _id: new ObjectId(id) }).exec();

    const actionQuery = _.indexOf(book.meta.favorites, pseudo) === -1 ? {$push: {favorites: pseudo}} : {$pull: {favorites: pseudo}};
    const action = _.indexOf(book.meta.favorites, pseudo) === -1 ? 'added to your favorites' : 'removed from your favorites';

    await this.bookModel.update({_id: new ObjectId(id)}, actionQuery).exec();
    return action;
  }

  async findBooksInFavorites(pseudo: string): Promise<Book[]> {
    return await this.bookModel.find({"meta.favorites": pseudo}).sort('-date').exec();
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
