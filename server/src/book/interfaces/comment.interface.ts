import { ApiModelProperty } from "@nestjs/swagger";

export class Comment {
  @ApiModelProperty()
  public message: string;
  @ApiModelProperty({ required: false })
  public createdAt?: Date;
}
