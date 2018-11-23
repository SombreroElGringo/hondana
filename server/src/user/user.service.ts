import { Model, ObjectId } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { User } from "./models/user.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: new ObjectId(id) });
  }

  async findByPseudo(pseudo: string): Promise<User> {
    return await this.userModel.findOne({ pseudo: pseudo });
  }

  async initializeUsers() {
    return null;
  }
}
