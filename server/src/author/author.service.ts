import { Model, ObjectId } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { Author } from "./models/author.interface";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel("Author") private readonly authorModel: Model<Author>,
  ) {}

  async createAuthor(author: Author): Promise<Author> {
    const createdAuthor = new this.authorModel(author);
    return await createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }

  async findById(id: string): Promise<Author> {
    return await this.authorModel.findOne({ _id: new ObjectId(id) });
  }

  async initializeAuthors() {
    return null;
  }
}
