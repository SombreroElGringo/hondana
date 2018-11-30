import { Model, Types } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./models/user.interface";
import { users as usersMockup } from "./mockup/user.mockup";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(@Query() query?): Promise<User[]> {
    const actionQueries = {};
    if (query) {
      if (query.pseudo) {
        actionQueries["pseudo"] = {
          $regex: query.pseudo,
          $options: "i",
        };
      }
      return await this.userModel.find(actionQueries).exec();
    } else {
      return await this.userModel.find().exec();
    }
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async findByPseudo(pseudo: string): Promise<User> {
    return await this.userModel.findOne({ pseudo: pseudo });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async commentUser(id: string, comment: object) {
    return await this.userModel.update(
      { _id: new Types.ObjectId(id) },
      { $push: { comments: comment } },
    );
  }

  async initializeUsers() {
    return await usersMockup.map(user => this.createUser(user));
  }

  async cleanUsers() {
    return await this.userModel.deleteMany().exec();
  }
}
