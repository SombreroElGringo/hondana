import { ApiModelProperty } from "@nestjs/swagger";

export class Author {
  @ApiModelProperty({ required: false })
  public _id?: string;
  @ApiModelProperty()
  public name: string;
  @ApiModelProperty()
  public authorCode: string;
  @ApiModelProperty()
  public biography: string;
  @ApiModelProperty()
  public profileImageUrl: string;
  @ApiModelProperty({ required: false })
  public books?: string[];
}
