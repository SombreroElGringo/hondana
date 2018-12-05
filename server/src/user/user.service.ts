import { Model, Types } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./interfaces/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(@Query() query?): Promise<User[]> {
    const actionQueries = {};

    if (query.pseudo) {
      actionQueries["pseudo"] = {
        $regex: query.pseudo,
        $options: "i",
      };
    }
    return await this.userModel.find(actionQueries).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async commentUser(id: string, comment: object) {
    return await this.userModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $push: { comments: comment } },
    );
  }

  async deleteUser(pseudo: string) {
    return await this.userModel.deleteOne({ pseudo: pseudo }).exec();
  }
}
