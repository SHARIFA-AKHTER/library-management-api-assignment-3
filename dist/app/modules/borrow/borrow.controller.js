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
exports.borrowedSummary = exports.borrowBook = void 0;
const borrow_model_1 = require("./borrow.model");
const sendResponse_1 = require("../../utils/sendResponse");
const book_model_1 = require("../book/book.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    const existingBook = yield book_model_1.Book.findById(book);
    if (!existingBook) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }
    if (existingBook.copies < quantity) {
        res.status(400).json({
            success: false,
            message: 'Not enough copies available'
        });
        return;
    }
    existingBook.copies -= quantity;
    if (existingBook.copies === 0) {
        existingBook.available = false;
    }
    yield existingBook.save();
    const borrow = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Books borrowed successfully",
        data: borrow,
    });
});
exports.borrowBook = borrowBook;
//Aggregation pipeline
const borrowedSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' },
            },
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'bookDetails',
            },
        },
        {
            $unwind: '$bookDetails',
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn',
                },
            },
        },
    ]);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "borrowed Books summary retrieved successfully",
        data: summary,
    });
});
exports.borrowedSummary = borrowedSummary;
