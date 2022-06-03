


import { Customer } from "../entity/customer.entity";


export default class CustomerService {

    private readonly customerModel = Customer;

    async create( input: Partial<Customer> ) {
        return await this.customerModel.create( input ).save();
    }

    async update( cid: Customer["cid"], input: Partial<Customer> ) {
        return await this.customerModel.update( {
            cid: cid
        }, input );
    }

    async remove( cid: Customer["cid"] ) {
        return await this.customerModel.delete( cid );
    }

    async getAll() {
        return await this.customerModel.find();
    }

    async getById( cid: Customer["cid"] ) {
        return await this.customerModel.findOne( {
            where: {
                cid
            }
        } );
    }

    async getPaginated( curPage, limit ) {

        curPage = parseInt( curPage, 10 ) || 1;
        limit = parseInt( limit, 10 ) || 2;

        const startIndex = ( curPage - 1 ) * limit;
        const endIndex = curPage * limit;


        const countPromise: Promise<number> = new Promise( async ( resolve, reject ) => {
            return resolve( await this.customerModel.count() );
        } );

        const documents: Promise<Array<Partial<Customer>>> = new Promise( async ( resolve, reject ) => {
            return resolve( await this.customerModel.find( {
                skip: startIndex,
                take: limit
            } ) );
        } );

        const [count, docs] = await Promise.all( [countPromise, documents] );

        // total pages
        const totalPage = Math.ceil( count / limit );
        let hasNext = false;
        let nextPage = totalPage;
        let hasPrev = false;
        let prevPage = 1;

        // check for has next page
        if ( endIndex < count ) {
            hasNext = true;
            nextPage = curPage + 1;
        }

        // check for prev page
        if ( startIndex > 0 ) {
            hasPrev = true;
            prevPage = curPage - 1;
        }

        return {
            total: count,
            limit,
            totalPage,
            currentPage: curPage,
            nextPage,
            prevPage,
            hasNextPage: hasNext,
            hasPrevPage: hasPrev,
            data: docs
        }


    }

}
