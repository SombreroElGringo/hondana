import { Author } from "../../../src/author/interfaces/author.interface";

export const authorMockup: Author = {
  name: "_J.K_Test_",
  biography: "test test",
  profileImageUrl: "img.png",
  books: []
};

export const authorsMockup: Author[] = [
  {
    name: "J. K. Rowling",
    biography:
      "J.K. Rowling is the author of the much-loved series of seven Harry Potter novels, originally published between 1997 and 2007.",
    profileImageUrl:
      "http://www.gstatic.com/tv/thumb/persons/174909/174909_v9_ba.jpg",
    books: [],
  },
  {
    name: "Albert Uderzo",
    biography:
      "Alberto Aleandro Uderzo, est un dessinateur et scénariste de bande dessinée",
    profileImageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Uderzo.jpg/220px-Uderzo.jpg",
      books:[],
  },
];
