import { Request, Response } from 'express';
import { returns } from '../utils/returns';
import { Database } from '../utils/database';
import { internalSignToken } from '../utils/tokens';
import { internalComparePassword, internalHashPassword } from '../utils/passwords';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)) {
            return res.status(400).send(returns(false, 'Please provide a username and a password to register!'));
        }

        const db = new Database();

        // Check if user already exists
        const userExists = await db.prisma.user.findFirst({
            where: {
                username
            }
        });

        // User exists
        if(userExists !== null) {
            return res.status(409).send(returns(false, 'User already exists! Please try another!'));
        }

        // Encrypt password
        const encryptedPassword = await internalHashPassword(password);

        await db.prisma.user.create({
            data: {
                username,
                password: encryptedPassword
            },
        });

        const token = await internalSignToken(username);

        return res.status(200).send(returns(true, token));
    } catch (error) {
        return res.status(400).send(returns(false, JSON.stringify(error)));
    };
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        
        const { username, password } = req.body;

        if(!(username && password)) {
            return res.status(400).send(returns(false, 'Please supply a username and a password'));
        }

        const db = new Database();

        const userObject = await db.prisma.user.findFirst({
            where: {
                username
            },
        });

        // User dont exist
        if(userObject === null) {
            return res.status(400).send(returns(false, 'Please supply a valid username and password'));
        }

        const isPasswordValid = await internalComparePassword(password, userObject.password);

        if(isPasswordValid === true) {
            const token = await internalSignToken(username);

            return res.status(200).send(returns(true, token));
        } else {
            return res.status(400).send(returns(false, 'Please supply a valid username and password'))
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send(returns(false, error));
    }
}