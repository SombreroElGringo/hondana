import { Controller, Get, Response, HttpStatus } from "@nestjs/common";
import { ClientProxy, Client, Transport } from "@nestjs/microservices";

@Controller()
export class HomeController {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  call(@Response() res) {
    const apiUrl = `http://localhost:${process.env.PORT}/api/v1/docs`;
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Hello welcome on the Hondana API!",
      docs: apiUrl,
    });
  }
}
