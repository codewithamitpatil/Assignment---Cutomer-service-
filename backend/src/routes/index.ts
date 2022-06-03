
import express from 'express';


import E404Handler from './e404';
import customerRoutes from './cutomer';

// routes
const routes = express.Router();


// user routes
routes.use( "/customer", customerRoutes );

// wild card route
routes.use( '*', E404Handler );


// export
export default routes;