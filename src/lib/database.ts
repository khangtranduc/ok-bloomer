import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "bloomer",
    connectionLimit: 10
})