import { z } from "zod";

export const createBorrowZodSchema = z.object({
    body: z.object({
        book: z.string({required_error: 'Book Id is required'}),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        dueDate: z.string({required_error: 'due date is required'}),
    }),
});