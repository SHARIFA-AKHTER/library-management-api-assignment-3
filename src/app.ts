import { Application,Request, Response } from "express";
import express from "express";
import { BookRoutes } from "./app/modules/book/book.route";
import { BorrowRoutes } from "./app/modules/borrow/borrow.route";
// import cors from 'cors';

const app : Application = express();

// app.use(cors())
app.use(express.json());

app.use("/books",BookRoutes);
app.use("/borrow",BorrowRoutes);

app.get('/', (req: Request, res: Response) =>{
    res.send('Library Management API is running')
})
export default app;