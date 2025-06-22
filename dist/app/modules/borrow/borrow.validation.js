"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrowZodSchema = void 0;
const zod_1 = require("zod");
exports.createBorrowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({ required_error: 'Book Id is required' }),
        quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
        dueDate: zod_1.z.string({ required_error: 'due date is required' }),
    }),
});
