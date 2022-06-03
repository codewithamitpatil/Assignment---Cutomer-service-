
import express, { Express, } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgon from 'morgan';

import { ErrorHandler } from './middlewares/errorhandler';
import apiRoutes from './routes/index';



// app
const app: Express = express();


// enable cors
app.use( cors( {
    origin: '*',
    credentials: true
} ) );

// enable security headers
app.use( helmet() );

// parse json
app.use( express.json() );

// parse urlencoded / form multipart data
app.use( express.urlencoded( { extended: true } ) );

// req logger
app.use( morgon( 'combined' ) );

// intialize api routes
app.use( '', apiRoutes );

// centrlize error handler
app.use( ErrorHandler );


// export app
export default app;


