import { Meta } from "./meta.interface";
import { Comment } from "./comment.interface";

export class Book {
  public isbn: string;
  public title: string;
  public author: string[];
  public owners?: string[];
  public description: string;
  public coverImageUrl: string;
  public categories: string[];
  public releaseAt?: Date;
  public comments?: Comment[];
  public meta?: Meta;
  public hidden?: Boolean = false;
}
