import { Request } from 'express';
import { EAccessError } from '../types/errors';

export async function checkAuthorizationHeader(req: Request): Promise<string>{
    
    if( req.header('authorization') == null )
        throw new Error(EAccessError.InvalidToken);

    if( req.header('authorization')?.match('Bearer') == null )
        throw new Error(EAccessError.InvalidToken);

    const token = req.header('authorization')?.split(' ')[1];

    if( token == null )
        throw new Error(EAccessError.InvalidToken);
    
    return token;
}