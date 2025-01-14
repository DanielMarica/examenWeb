import { Router } from "express";
import {
  readAllBooks,
  readOneBook,
} from "../services/book";
import { authorize } from "../utils/auths";

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

export default router;
