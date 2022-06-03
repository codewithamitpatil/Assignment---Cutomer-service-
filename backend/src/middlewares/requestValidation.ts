import {
    NextFunction,
    Request,
    Response
} from "express";


const validateRequest = ( schema: any ) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        await schema.validateAsync( {
            body: req.body
        } );

        return next();

    } catch ( error ) {
        return next( error );
    }


};

// export
export default validateRequest;