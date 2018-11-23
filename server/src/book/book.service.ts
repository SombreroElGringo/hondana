import { Model, ObjectId } from "mongoose";
import { Injectable, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { Book } from "./models/book.interface";

@Injectable()
export class BookService {
  /*
  private apiURL: string = "https://data.sncf.com/api";
  private endpoint: string =
    "/records/1.0/search/?dataset=liste-des-gares&rows=10000&facet=fret&facet=voyageurs&facet=code_ligne&facet=departement&refine.voyageurs=O";

  findAll(query?: string): Promise<Book[]> {
    const url =
      this.apiURL + this.endpoint + (query ? `&${qs.stringify(query)}` : "");
    let books: Book[] = [];
    return get(url, null)
      .then(response => {
        const records = response["records"] ? response["records"] : [];
        if (records.length > 0) {
          records.map(item => {
            const book: Book = {
              recordId: item.recordid,
              libelle_gare: item.fields.libelle_gare,
              departement: item.fields.departement,
              commune: item.fields.commune,
              code_ligne: item.fields.code_ligne,
              coordonnees_geographiques: item.fields.coordonnees_geographiques,
            };
            books.push(book);
          });
        }
        return books;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }*/

  constructor(@InjectModel("Book") private readonly bookModel: Model<Book>) {}

  async createBook(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async findAll(@Query() query): Promise<Book[]> {
    return await this.bookModel.find(query).exec();
  }

  async findById(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: new ObjectId(id) }).exec();
  }

  async search(title: string): Promise<Book[]> {
    return await this.bookModel.find({ $text: { $search: title } }).exec();
  }

  async initializeBooks() {
    return null;
  }
}
