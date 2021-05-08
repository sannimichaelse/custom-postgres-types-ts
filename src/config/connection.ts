import { createConnection } from 'typeorm';
export const dbConnection = async () => {
    return createConnection();
};
