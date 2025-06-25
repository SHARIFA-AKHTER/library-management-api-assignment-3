
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createBorrowZodSchema } from './borrow.validation';
import { borrowBook, borrowedSummary } from './borrow.controller';

export const BorrowRoutes = express.Router();

BorrowRoutes.post('/', validateRequest(createBorrowZodSchema), borrowBook);

BorrowRoutes.get('/', borrowedSummary);
