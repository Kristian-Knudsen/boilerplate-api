import bcrypt from 'bcrypt';

export const internalHashPassword = (password: string, saltRounds: number = 10): Promise<string> => {
    return new Promise(async(resolve) => {
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        return resolve(hashedPassword);
    });
};

export const internalComparePassword = (unencrypted: string, encrypted: string): Promise<Boolean> => {
    return new Promise(async(resolve) => {
        let passwordsMatch = await bcrypt.compare(unencrypted, encrypted);

        return resolve(passwordsMatch);
    });
};