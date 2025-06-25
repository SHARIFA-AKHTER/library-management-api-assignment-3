"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("./app/modules/book/book.route");
const borrow_route_1 = require("./app/modules/borrow/borrow.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_route_1.BookRoutes);
app.use("/api/borrow", borrow_route_1.BorrowRoutes);
app.get('/', (req, res) => {
    res.send('Library Management API is running');
});
exports.default = app;
