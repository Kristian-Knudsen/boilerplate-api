import jwt, { Secret } from 'jsonwebtoken';
import { returns } from './returns';

type returnType = {
    success: Boolean,
    value: String
};

export const internalVerifyToken = (token: string): Promise<returnType> => {
    return new Promise((resolve, reject) => {
        
        jwt.verify(token, process.env.TOKEN_KEY as Secret, (error, decoded) => {
            if(error) {
                return reject(returns(false, error.message));
            }

            return resolve(returns(true, ''));
        });
    });
};

export const internalSignToken =  (value: string, expiry: string = '1d') => {
    return new Promise((resolve, reject) => {


        jwt.sign({ value: value }, process.env.TOKEN_KEY as Secret, { expiresIn: expiry }, (error, token) => {
            if(error) {
                return reject(returns(false, error.message));
            }

            return resolve(token);
        });
    });
};