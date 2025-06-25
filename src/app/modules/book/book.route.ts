import validateRequest from "../../middlewares/validateRequest";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "./book.controller";

import { createBookZodSchema } from "./book.validation";
import express from 'express';

export const BookRoutes = express.Router();

BookRoutes.post('/',validateRequest(createBookZodSchema), createBook);

BookRoutes.get('/', getAllBooks);

BookRoutes.get('/:bookId', getBookById);

BookRoutes.put('/:bookId', updateBook);

BookRoutes.delete('/:bookId', deleteBook);
