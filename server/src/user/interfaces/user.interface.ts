import { Comment } from "./comment.interface";

export class User {
  public _id?: string;
  public pseudo: string;
  public password: string;
  public email: string;
  public profileImageUrl?: string;
  public bookcases?: string[];
  public comments?: Comment[];
}
