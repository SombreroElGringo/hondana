export class Bookcase {
  public _id?: string;
  public owner: string;
  public books?: [
    {
      bookId: string;
      isAvailable: Boolean;
    }
  ];
}
