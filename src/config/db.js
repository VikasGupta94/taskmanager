import mysql from 'mysql2/promise';
import { genVar } from './genVar.js';
const pool = mysql.createPool({
    connectionLimit: 10,
    host: genVar.MYSQL_HOST,
    port: parseInt(genVar.MYSQL_PORT),
    user: genVar.MYSQL_USER,
    password: genVar.MYSQL_PASSWORD,
});
async function testPoolConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Pool connection successful!');
        connection.release(); 
    } catch (err) {
        console.error('Pool connection failed:', err.message);
    }
}
testPoolConnection();
export default pool;