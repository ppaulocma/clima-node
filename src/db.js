require("dotenv").config();
const mysql = require('mysql2/promise');

const connect = async () => {
    if(global.connection && global.connection.state != "disconected")
        return global.connection;

    try {
        const conn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });

        global.connection = conn;
        
        return conn;
    } catch (error) {
        console.log(error);
    }
}


const SQL = async (sql, values = false) => {
    const conn = await connect();
    try {
        let [rows] = await conn.query(sql, values);
        if (rows.insertId > 0)
            return rows.insertId;
        else if (rows.insertId != undefined)
            return [];
        else 
            return rows;
    } catch (error) {
        return `${error.sqlMessage} on "${error.sql}"`;
    }
}

module.exports = {
    SQL
}