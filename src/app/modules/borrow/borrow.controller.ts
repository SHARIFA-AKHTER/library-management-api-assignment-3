

import { Borrow } from './borrow.model';
import { sendResponse } from '../../utils/sendResponse';
import { Book } from '../book/book.model';
import { RequestHandler } from 'express';

export const borrowBook:RequestHandler = async (req,res) =>{
    const {book, quantity, dueDate} = req.body;

    const existingBook = await Book.findById(book);

    if(!existingBook){
       res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }

    if (existingBook.copies < quantity){
        res.status(400).json({
            success: false,
            message: 'Not enough copies available'
        })
        return
    }

    existingBook.copies -= quantity;
    if(existingBook.copies === 0){
        existingBook.available = false;
    }
    await existingBook.save()
    const borrow = await Borrow.create({book, quantity, dueDate});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Books borrowed successfully",
        data: borrow,
      });
}

//Aggregation pipeline

export const borrowedSummary: RequestHandler = async(_req, res) =>{
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