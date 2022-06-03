
import joi from 'joi';
import httpError from 'http-errors';
//create
export const customerCreateSchema = joi.object( {

    body: joi.object( {
        name: joi.string()
            .required(),
        phone: joi.string()
            .min( 10 )
            .max( 10 )
            .required().error( new httpError.BadRequest( "Phone Length Must Be  10 Characters Long" ) ),

        dob: joi.string().required()
    } )

} );

// update
export const customerUpdateSchema = joi.object( {

    body: joi.object( {
        name: joi.string(),
        phone: joi.string()
            .min( 10 )
            .max( 10 )
        ,
        dob: joi.string()
    } )

} );