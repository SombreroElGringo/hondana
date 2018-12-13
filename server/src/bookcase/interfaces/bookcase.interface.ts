export class Bookcase {
  public _id?: string;
  public owner: string;
  public books?: string[];
  public coordinate?: {
    latitude: string;
    longitude: string;
  };
}
