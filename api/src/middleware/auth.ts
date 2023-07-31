import { Request, Response, NextFunction } from 'express';
import { returns } from '../utils/returns';
import { internalVerifyToken } from '../utils/tokens';

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send(returns(false, 'A token is required for authentication'));
    }

    try {
        const isTokenValid = await internalVerifyToken(token);

        // Token is valid
        if(isTokenValid.success) {
            next();
        } else {
            return res.status(400).send(returns(false, isTokenValid.value));
        }
    } catch (error) {
        return res.status(400).send(returns(false, error));        
    }
};