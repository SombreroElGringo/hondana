export class Bookcase {
  public owner: string;
  public books: [
    {
      bookId: string;
      isAvailable: Boolean;
    }
  ];
}
