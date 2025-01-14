import path from "node:path";
import { Book } from "../utils/type";
import { parse } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/books.json");

const defaultBooks: Book[] = [
  {
    id: 1,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    coverImage: "https://images.unsplash.com/photo-1580502718688-2e19b656b5bf?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    coverImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1476&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    year: 1997,
    coverImage: "https://images.unsplash.com/photo-1598153346810-860daa814c4b?q=80&w=1472&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1374&auto=format&fit=crop"
  }
];

function readAllBooks(): Book[] {
  const books = parse(jsonDbPath, defaultBooks);
  return books;
}

function readOneBook(id: number): Book | undefined {
  const books = parse(jsonDbPath, defaultBooks);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return undefined;
  }
  return book;
}

export {
  readAllBooks,
  readOneBook
};
