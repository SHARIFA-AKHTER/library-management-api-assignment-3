
import { Model, model, Schema } from "mongoose";

 export type TGenre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY'

 export interface IBook{
    title: string;
    author: string;
    genre: TGenre;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
 }

 interface IBookMethods{
    updateAvailability(): void;
 }

 type BookModelType = Model<IBook, {}, IBookMethods>

 const bookSchema = new Schema<IBook,BookModelType,IBookMethods>(
    {
        title: { type: String,required: true},
        author: { type: String,required: true},
        genre: {
            type: String,
            required: true,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
        },
        isbn: {type:String, required: true, unique: true},
        description: {type: String},
        copies: { type: Number, required: true,min: 0},
        available: {type: Boolean,default:true},
    },
    {
        timestamps:true,
    }
 );

 //instance methods
 bookSchema.methods.updateAvailability = function(){
    this.available = this.copies > 0
 }
 export const Book = model<IBook, BookModelType>('Book', bookSchema)