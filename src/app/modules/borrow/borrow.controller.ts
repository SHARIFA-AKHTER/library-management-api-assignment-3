

import { Borrow } from './borrow.model';
import { sendResponse } from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { Book } from '../book/book.model';

export const borrowBook = async (req: Request, res: Response) =>{
    const {book, quantity, dueDate} = req.body;

    const existingBook = await Book.findById(book);

    if(!existingBook){
        return res.status(404).json({
            success: false,
            message: 'Book not found',
        })
    }

    if (existingBook.copies < quantity){
        return res.status(400).json({
            success: false,
            message: 'Not enough copies available'
        })
    }
    const borrow = await Borrow.create({book, quantity, dueDate});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Books borrowed successfully",
        data: borrow,
      });
}

//Aggregation pipeline

export const borrowedSummary = async(_req: Request, res: Response) =>{
    const summary = await Borrow.aggregate([
        {
            $group:{
                _id: '$book',
                totalQuantity:{$sum: '$quantity'},
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
                book:{
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn',
                },
            },
        },
    ]);
     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "borrowed Books summary retrieved successfully",
        data: summary,
      });
}