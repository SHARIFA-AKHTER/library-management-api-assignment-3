"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const book_model_1 = require("./book.model");
//create book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.create(req.body);
    console.log("Book created:", book);
    //   await book.save();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Book created successfully",
        data: book,
    });
});
exports.createBook = createBook;
//create all book
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
    const query = {};
    if (filter && typeof filter === "string" && filter.trim() !== "") {
        query.genre = filter;
    }
    const books = yield book_model_1.Book.find(query)
        .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
        .limit(Number(limit));
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
});
exports.getAllBooks = getAllBooks;
//create book id
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("getBookById route hit with:",req.params.bookId);
    const book = yield book_model_1.Book.findById(req.params.bookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books retrieved successfully",
        data: book,
    });
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books Update successfully",
        data: book,
    });
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.findByIdAndUpdate(req.params.bookId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books Deleted successfully",
        data: null,
    });
});
exports.deleteBook = deleteBook;
