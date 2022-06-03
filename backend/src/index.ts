import "reflect-metadata";
import 'dotenv/config';
import app from './app';


import { AppDataSource } from "./data-source";


// configs
const port = parseInt( process.env.PORT ) || 5000;


// intialize connection
export const db = async () => {
    AppDataSource
        .initialize()
        .then( async () => {
            console.log( 'Mysql Is Connected' );
            // start server
            server();
        } )
        .catch( error => console.log( error ) )
}

// express server
const server = async () => {
    app.listen( port, () => {
        console.log( `Server is listening on port: ${ port }` );
    } );
}


// start db
db();