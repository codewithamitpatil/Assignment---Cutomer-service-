
import { Request, Response, NextFunction } from 'express';
import { get } from "lodash";
import { autoInjectable } from 'tsyringe';
import httpError from 'http-errors';

import CustomerService from "../services/customer";



@autoInjectable()
export default class CustomerController {

    private readonly customerService: CustomerService;

    public constructor( customerService: CustomerService ) {
        this.customerService = customerService;
    }

    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {


        let page = get( req.query, "page" ) || 1;
        let limit = get( req.query, "limit" ) || 2;

        let docs = await this.customerService.getPaginated( page, limit );

        if ( !docs ) {
            return res.send( {
                status: 200,
                data: null
            } )
        }

        return res.send( {
            status: 200,
            ...docs
        } )
    }

    public create = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        let data = await this.customerService.create( req.body );

        res.send( {
            status: 200,
            message: "Customer created successfully",
            data
        } );

    }

    public update = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        let cid = get( req.params, "cid" );

        const idCheck = await this.customerService.getById( cid );

        if ( !idCheck ) return next( new httpError.BadRequest( "Invalid Customer Id" ) )

        await this.customerService.update( cid, req.body );

        res.send( {
            status: 200,
            message: "Customer updated successfully",

        } )
    }

    public remove = async (
        req: Request,
        res: Response,
        next: NextFunction ) => {

        let cid = get( req.params, "cid" );

        const idCheck = await this.customerService.getById( cid );

        if ( !idCheck ) return next( new httpError.BadRequest( "Invalid Customer Id" ) )

        await this.customerService.remove( cid );

        res.send( {
            status: 200,
            message: "Customer deleted successfully"
        } )
    }
}