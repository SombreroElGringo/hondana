import { ApiModelProperty } from "@nestjs/swagger";

export class Bookcase {
  @ApiModelProperty({ required: false })
  public _id?: string;
  @ApiModelProperty()
  public owner: string;
  @ApiModelProperty({ required: false })
  public books?: string[];
  @ApiModelProperty()
  public coordinate?: {
    latitude: string;
    longitude: string;
  };
}
