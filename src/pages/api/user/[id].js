import mysql from 'mysql2/promise';
export const runtime = 'edge';

export default async function handler(request, response) {
    const userId = request.query.id;
    const connection = await mysql.createConnection(process.env.DATABASE_URL)

    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `id` = ?', [userId])

    return response.status(200).json({
        //body: request.body,
        user: rows[0] ?? {}
        // query: request.query,
        // cookies: request.cookies,
        // env: process.env.MY_SECRET,
    });
}