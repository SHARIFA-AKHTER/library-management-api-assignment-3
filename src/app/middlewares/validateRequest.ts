import { AnyObject } from "mongoose";
import { NextFunction, Request } from 'express';
import { Response } from 'express';


const validateRequest = (schema: AnyObject) => async(
    req : Request,
    res: Response,
    next: NextFunction
)=>{
    try{
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
         next();
    }catch(err){
    next(err)
}
   
}

export default validateRequest;