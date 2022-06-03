import express, { Express, } from 'express';
import { container } from 'tsyringe';


import asyncHandler from '../middlewares/asyncHandler';
import validateRequest from '../middlewares/requestValidation';
import CustomerController from '../controllers/customer';

import {
    customerCreateSchema,
    customerUpdateSchema
} from '../schema/customer';

// routes
const routes = express.Router();

// controller
const customerController = container.resolve( CustomerController );


routes.get( '',
    asyncHandler( customerController.getAll ) )

// create 
routes.post( '',
    validateRequest( customerCreateSchema ),
    asyncHandler( customerController.create ) )

// update 
routes.put( '/:cid',
    validateRequest( customerUpdateSchema ),
    asyncHandler( customerController.update ) )

// remove 
routes.delete( '/:cid',
    asyncHandler( customerController.remove ) )

// export
export default routes;
