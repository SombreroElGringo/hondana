import { ApiModelProperty } from "@nestjs/swagger";

export class JwtPayload {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}
