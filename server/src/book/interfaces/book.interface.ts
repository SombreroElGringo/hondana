import { ApiModelProperty } from "@nestjs/swagger";
import { Meta } from "./meta.interface";
import { Comment } from "./comment.interface";

export class Book {
  @ApiModelProperty({ required: false })
  public _id?: string;
  @ApiModelProperty()
  public isbn10: string;
  @ApiModelProperty()
  public isbn13?: string;
  @ApiModelProperty()
  public title: string;
  @ApiModelProperty()
  public authors: string[];
  @ApiModelProperty()
  public bookcases: string[];
  @ApiModelProperty()
  public description: string;
  @ApiModelProperty()
  public coverImageUrl: string;
  @ApiModelProperty()
  public categories: string[];
  @ApiModelProperty({ required: false })
  public releaseAt?: Date;
  @ApiModelProperty({ required: false })
  public comments?: Comment[];
  @ApiModelProperty({ required: false })
  public meta?: Meta;
  @ApiModelProperty()
  public hidden?: Boolean;
}
