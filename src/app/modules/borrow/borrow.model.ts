import { Schema, Types } from "mongoose";
import { Book } from "../book/book.model";
import { model } from "mongoose";




export interface IBorrow {
    book: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
        quantity: {type: Number, required: true, min: 1},
       dueDate: {type: Date, required: true}

    },
    {
        timestamps: true,
    }
);

borrowSchema.post('save', async function (doc){
    const book = await Book.findById(doc.book);
    if(book){
        book.copies -= doc.quantity
        book.updateAvailability();
        await book.save()
    }
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema);