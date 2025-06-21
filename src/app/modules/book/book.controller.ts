import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { Book } from "./book.model";

//create book
export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  console.log("Book created:", book);
//   await book.save();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book created successfully",
    data: book,
  });
};

//create all book
export const getAllBooks = async (req: Request, res: Response) => {
  const {
    filter,
    sortBy = "createdAt",
    sort = "desc",
    limit = "10",
  } = req.query;

  const query: any = {};

  if (filter && typeof filter === "string" && filter.trim() !== "") {
    query.genre = filter;
  }

  const books = await Book.find(query)
    .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
    .limit(Number(limit));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
};

//create book id

export const getBookById = async (req: Request, res: Response) => {
   // console.log("getBookById route hit with:",req.params.bookId);
  const book = await Book.findById(req.params.bookId);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books retrieved successfully",
    data: book,
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books Update successfully",
    data: book,
  });
};


export const deleteBook = async (req: Request, res: Response)=>{
   await Book.findByIdAndUpdate(req.params.bookId)
   sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Books Deleted successfully",
    data: null,
  });
}