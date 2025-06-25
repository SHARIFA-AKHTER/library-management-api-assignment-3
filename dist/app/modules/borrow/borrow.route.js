"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const borrow_validation_1 = require("./borrow.validation");
const borrow_controller_1 = require("./borrow.controller");
exports.BorrowRoutes = express_1.default.Router();
exports.BorrowRoutes.post('/', (0, validateRequest_1.default)(borrow_validation_1.createBorrowZodSchema), borrow_controller_1.borrowBook);
exports.BorrowRoutes.get('/', borrow_controller_1.borrowedSummary);
