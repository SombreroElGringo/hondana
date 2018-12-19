import { Comment } from "./comment.interface";
import { ApiModelProperty } from "@nestjs/swagger";

export class User {

  @ApiModelProperty({ required: false })
  public _id?: string;
  @ApiModelProperty()
  public pseudo: string;
  @ApiModelProperty()
  public password: string;
  @ApiModelProperty()
  public email: string;
  @ApiModelProperty({ required: false })
  public profileImageUrl?: string;
  @ApiModelProperty({ required: false })
  public bookcases?: string[];
  @ApiModelProperty({ required: false })
  public comments?: Comment[];
}
