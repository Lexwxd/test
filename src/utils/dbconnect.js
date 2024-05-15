import mysql from 'mysql2/promise';
import { DB, HOST, PASSWORD, USER } from './env.js';
export const mysqlConnect = await mysql.createConnection({
    host: HOST,
    user: USER,
    database:DB,
    password: PASSWORD
});