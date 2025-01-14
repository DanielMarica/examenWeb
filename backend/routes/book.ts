import { Router } from "express";
import {
  readAllBooks,
  readOneBook,
  createOneBook
} from "../services/book";
import { authorize  } from "../utils/auths";
import { NewBook } from "../utils/type";

const router = Router();

router.get("/",authorize, (_req, res) => {
  const books = readAllBooks();
  return res.json(books);
});

router.get("/:id",authorize, (req, res) => {
  const id = Number(req.params.id);
  const book = readOneBook(id);
  if (!book) {
    return res.sendStatus(404);
  }
  return res.json(book);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("author" in body) ||
    !("year" in body) ||
    typeof body.title !== "string" ||
    typeof body.author !== "string" ||
    typeof body.year !== "number" ||
    !body.title.trim() ||
    !body.author.trim() ||
    body.year <= 0 ||
    ("coverImage" in body && 
      (typeof body.coverImage !== "string" || !body.coverImage.trim()))
  ) {
    return res.sendStatus(400);
  }

  const { title, author, year, coverImage } = body as NewBook;

  const newBook = createOneBook({ title, author, year, coverImage });
  return res.json(newBook);
});

export default router;
