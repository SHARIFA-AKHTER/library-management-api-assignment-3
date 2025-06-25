"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const express_1 = __importDefault(require("express"));
exports.BookRoutes = express_1.default.Router();
exports.BookRoutes.post('/', (0, validateRequest_1.default)(book_validation_1.createBookZodSchema), book_controller_1.createBook);
exports.BookRoutes.get('/', book_controller_1.getAllBooks);
exports.BookRoutes.get('/:bookId', book_controller_1.getBookById);
exports.BookRoutes.put('/:bookId', book_controller_1.updateBook);
exports.BookRoutes.delete('/:bookId', book_controller_1.deleteBook);
