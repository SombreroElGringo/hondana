import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { BookService } from "../book.service";

@WebSocketGateway()
export class BookGateway {
  @WebSocketServer() server;
  constructor(private readonly bookService: BookService) {}

  @SubscribeMessage("eventGetFiveLastBooks")
  async eventGetFiveLastBooks(client): Promise<any> {
    const books = await this.bookService.findLastestBookAdded(5);
    return books;
  }

  @SubscribeMessage("eventSendFiveLastBooks")
  async eventSendFiveLastBooks() {
    const books = await this.bookService.findLastestBookAdded(5);
    this.server.emit("eventSendFiveLastBooks", books);
  }

  @SubscribeMessage("identity")
  async identity(client) {
    this.server.emit("hello", "Hello, I am the Server of Hondana!");
  }
}
