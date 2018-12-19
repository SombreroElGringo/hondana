import { ApiModelProperty } from "@nestjs/swagger";

export class Meta {
  @ApiModelProperty()
  public favorites: string[];
  @ApiModelProperty()
  public likes: string[];
}
