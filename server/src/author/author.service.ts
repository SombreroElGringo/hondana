import { Model, Types } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Author } from "./interfaces/author.interface";
import { authors as authorsMockup } from "./mockup/author.mockup";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel("Author") private readonly authorModel: Model<Author>,
  ) {}

  async createAuthor(author: Author): Promise<Author> {
    const createdAuthor = new this.authorModel(author);
    return await createdAuthor.save();
  }

  async findAll(@Query() query?): Promise<Author[]> {
    if (query) {
      const actionQueries = {};
      if (query.name) {
        actionQueries["name"] = {
          $regex: query.name,
          $options: "i",
        };
      }
      return await this.authorModel.find(actionQueries).exec();
    } else {
      return await this.authorModel.find().exec();
    }
  }

  async findById(id: string): Promise<Author> {
    return await this.authorModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
  }

  async editAuthor(id: string, params: Object): Promise<Author> {
    return await this.authorModel
      .update({ _id: new Types.ObjectId(id) }, { $set: params })
      .exec();
  }

  async initializeAuthors() {
    return await authorsMockup.map(author => this.createAuthor(author));
  }

  async cleanAuthors() {
    return await this.authorModel.deleteMany().exec();
  }
}
