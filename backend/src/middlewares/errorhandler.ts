
import express, {
    Request,
    Response,
    NextFunction
} from 'express';

export const ErrorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction ) => {

    console.log( err )

    // to handle unexpected error
    let message = err.message || "Internal server error";
    let status = err.status || 500;


    // to handle user req schema validation error
    if ( err?.isJoi ) {
        status = 400;
        // return res.status( 400 ).json( {
        //     'status': 400,
        //     'message': err.message
        // } )
    }

    if ( err.code == "ER_DUP_ENTRY" ) {
        status = 400;
        message = "bad request";
    }

    return res.status( status ).send( {
        status,
        message
    } )
}