import { Application,Request, Response } from "express";
import express from "express";
import { BookRoutes } from "./app/modules/book/book.route";
import { BorrowRoutes } from "./app/modules/borrow/borrow.route";


const app : Application = express();

app.use(express.json());

app.use("/api/books",BookRoutes);
app.use("/api/borrow",BorrowRoutes);

app.get('/', (req: Request, res: Response) =>{
    res.send('Library Management API is running')
})
export default app;