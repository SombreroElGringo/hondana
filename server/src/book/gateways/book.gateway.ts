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

  @SubscribeMessage("eventFindAllBooks")
  async eventFindAllBooks(client, query): Promise<any> {
    const books = await this.bookService.findAll(query);
    return books;
  }

  @SubscribeMessage("sendAllBooksOnNewRow")
  async sendAllBooksOnNewRow() {
    const books = await this.bookService.findLastestBookAdded(5);
    this.server.emit("sendAllBooksOnNewRow", books);
  }

  @SubscribeMessage("identity")
  async identity(client) {
    this.sendAllBooksOnNewRow();
    this.server.emit("hello", "Hello, I am the Server of Hondana!");
  }
}
