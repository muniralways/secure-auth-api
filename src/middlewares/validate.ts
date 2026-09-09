import type {AnyZodObject} from "zod/v3";
import type {Response, Request,NextFunction} from "express";


export const validateRequest = (schema: AnyZodObject) =>

    async (req: Request, res: Response, next : NextFunction) => {

    try {


        const  data =  await  schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,

        })

        req.body = data.body ;
        req.params = data.params;
        req.query = req.query;
        next()



    }catch (err ) {
        next(err)
    }

}