import mysql from 'mysql2/promise';

// export const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "admin",
//     database: "bloomer",
//     connectionLimit: 10
// })

export const db = mysql.createPool({
    host: "35.198.210.196",
    user: "bloomer",
    password: "TO3bd5$tkdGP(ghQ",
    database: "bloomer",
    connectionLimit: 10
})