// Run this script with: node migrations/create_mysql_contacts.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function run() {
  const MYSQL_URL = process.env.MYSQL_URL || null;
  const pool = MYSQL_URL
    ? mysql.createPool(MYSQL_URL)
    : mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'titanobova'
      });

  const createSql = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createSql);
    console.log('Contacts table created or already exists.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
}

run();
