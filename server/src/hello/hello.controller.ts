import { Controller, Get } from "@nestjs/common";
import {
  ClientProxy,
  Client,
  Transport,
  MessagePattern,
} from "@nestjs/microservices";
import { Observable } from "rxjs";

@Controller("/hello")
export class HelloController {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  call(): Observable<number> {
    const pattern = { cmd: "greet" };
    const data = "World";
    return this.client.send<number>(pattern, data);
  }

  @MessagePattern({ cmd: "greet" })
  greet(data: string): string {
    return data ? `Hello ${data}!` : "Hello!";
  }
}
