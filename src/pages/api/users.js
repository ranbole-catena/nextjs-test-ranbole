import mysql from 'mysql2/promise';

export default async function handler(request, response) {
    const userId = request.query.id;
    const connection = await mysql.createConnection(process.env.DATABASE_URL)

    const [rows, fields] = await connection.execute('SELECT * FROM `users`')

    return response.status(200).json(rows);
}

export const runtime = 'edge';