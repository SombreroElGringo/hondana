import { Comment } from "./comment.interface";

export class User {
  public pseudo: string;
  public password: string;
  public email: string;
  public profileImageUrl?: string;
  public comments?: Comment[];
}
