import express, {
    Request,
    Response,
    NextFunction
} from 'express';

import httpErros from 'http-errors';


const E404Handler = async (
    req: Request,
    res: Response,
    next: NextFunction ) => {
    return next( new httpErros.NotFound() );
};


// export
export default E404Handler;