import { Model, Types } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Author } from "./interfaces/author.interface";

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
    const actionQueries = {};
    if (query.name) {
      actionQueries["name"] = {
        $regex: query.name,
        $options: "i",
      };
    }
    return await this.authorModel.find(actionQueries).exec();
  }

  async findById(id: string): Promise<Author> {
    return await this.authorModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
  }

  async editAuthor(id: string, params: Object): Promise<Author> {
    return await this.authorModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $set: params })
      .exec();
  }

  async deleteAuthor(name: string) {
    return await this.authorModel.deleteOne({ name: name }).exec();
  }
}
