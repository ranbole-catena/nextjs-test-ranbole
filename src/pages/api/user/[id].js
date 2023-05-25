import mysql from 'mysql2/promise';

export default async function handler(request, response) {
    const userId = request.query.id;
    //const mysql = require('mysql2')
    const connection = await mysql.createConnection(process.env.DATABASE_URL)
    console.log('DB URL', process.env.DATABASE_URL);

    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `id` = ?', [userId])

    return response.status(200).json({
        //body: request.body,
        user: rows[0] ?? {}
        // query: request.query,
        // cookies: request.cookies,
        // env: process.env.MY_SECRET,
    });


    // let user = rows[0]
    console.log('user', user)
    connection.end()
}