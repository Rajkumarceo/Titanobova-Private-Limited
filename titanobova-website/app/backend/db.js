// MySQL Database Module with SQLite Fallback
// Tries MySQL first, falls back to SQLite if MySQL is unavailable

const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let useMySQL = true;
let pool = null;
let db = null;
let dbInitialized = false;

// Initialize SQLite immediately
const DB_FILE = path.join(__dirname, 'data', 'contacts.db');
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error('✗ SQLite creation failed:', err.message);
  else console.log('✓ SQLite connection established (fallback ready).');
});

// Try to create MySQL connection pool only if credentials are explicitly set
try {
  // Check if MySQL credentials are provided (not defaults)
  const hasMySQL = process.env.MYSQL_HOST && process.env.MYSQL_PASSWORD && process.env.MYSQL_USER !== 'root';
  
  if (hasMySQL) {
    pool = process.env.MYSQL_URL
      ? mysql.createPool(process.env.MYSQL_URL)
      : mysql.createPool({
          host: process.env.MYSQL_HOST || 'localhost',
          port: parseInt(process.env.MYSQL_PORT || '3306'),
          user: process.env.MYSQL_USER || 'root',
          password: process.env.MYSQL_PASSWORD || '',
          database: process.env.MYSQL_DATABASE || 'titanobova',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        });
  } else {
    console.log('ℹ MySQL not configured, using SQLite');
    useMySQL = false;
  }
} catch (err) {
  console.warn('⚠ MySQL pool creation failed, will use SQLite');
  useMySQL = false;
}

// Export unified database API
module.exports = {
  /**
   * Insert a contact into the database
   * @param {Object} contact - Contact details
   * @returns {Promise} - { id: insertId }
   */
  insertContact: async ({ name, email, phone, subject, message }) => {
    if (useMySQL && pool) {
      try {
        const sql = 'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [name, email, phone || '', subject || '', message]);
        return { id: result.insertId };
      } catch (err) {
        console.error('✗ MySQL insert error:', err.message);
        throw err;
      }
    } else {
      // SQLite fallback
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [name, email, phone || '', subject || '', message], function(err) {
          if (err) {
            console.error('✗ SQLite insert error:', err.message);
            return reject(err);
          }
          resolve({ id: this.lastID });
        });
      });
    }
  },

  /**
   * Get all contacts from the database
   * @returns {Promise} - Array of contacts
   */
  getContacts: async () => {
    if (useMySQL && pool) {
      try {
        const [rows] = await pool.query('SELECT id, name, email, phone, subject, message, created_at FROM contacts ORDER BY created_at DESC');
        return rows || [];
      } catch (err) {
        console.error('✗ MySQL query error:', err.message);
        throw err;
      }
    } else {
      // SQLite fallback
      return new Promise((resolve, reject) => {
        const sql = `SELECT id, name, email, phone, subject, message, created_at FROM contacts ORDER BY created_at DESC`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            console.error('✗ SQLite query error:', err.message);
            return reject(err);
          }
          resolve(rows || []);
        });
      });
    }
  },

  /**
   * Initialize database (create table if not exists)
   * @returns {Promise<boolean>} - true if successful
   */
  init: async () => {
    if (useMySQL && pool) {
      try {
        // Test connection first
        const connection = await pool.getConnection();
        connection.release();

        // Create table
        const createSql = `
          CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            subject VARCHAR(255),
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_created (created_at)
          );
        `;
        await pool.query(createSql);
        console.log('✓ MySQL contacts table ready.');
        dbInitialized = true;
        return true;
      } catch (err) {
        console.error('✗ MySQL connection error:', err.code, '-', err.message);
        console.warn('⚠ Falling back to SQLite...');
        useMySQL = false;
      }
    }

    // SQLite initialization (fallback)
    return new Promise((resolve) => {
      const initSql = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;
      db.run(initSql, (err) => {
        if (err) {
          console.error('✗ SQLite init error:', err.message);
          return resolve(false);
        }
        console.log('✓ SQLite contacts table ready (fallback mode).');
        dbInitialized = true;

        // Ensure registrations table exists as well
        const regSql = `
          CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            course TEXT NOT NULL,
            level TEXT,
            price INTEGER NOT NULL,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `;
        db.run(regSql, (err2) => {
          if (err2) console.error('✗ SQLite registrations table error:', err2.message);
          else console.log('✓ SQLite registrations table ready.');
          resolve(true);
        });
      });
    });
  },

  /**
   * Get all registrations
   */
  getRegistrations: async () => {
    if (useMySQL && pool) {
      try {
        const [rows] = await pool.query('SELECT id, name, email, phone, course, level, price, notes, created_at FROM registrations ORDER BY created_at DESC');
        return rows || [];
      } catch (err) {
        console.error('✗ MySQL registrations query error:', err.message);
        throw err;
      }
    } else {
      return new Promise((resolve, reject) => {
        const sql = `SELECT id, name, email, phone, course, level, price, notes, created_at FROM registrations ORDER BY created_at DESC`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            console.error('✗ SQLite registrations query error:', err.message);
            return reject(err);
          }
          resolve(rows || []);
        });
      });
    }
  },

  /**
   * Mark a registration as paid
   */
  markRegistrationPaid: async (id) => {
    if (useMySQL && pool) {
      try {
        const sql = 'UPDATE registrations SET paid = 1 WHERE id = ?';
        const [result] = await pool.execute(sql, [id]);
        return { changedRows: result.affectedRows || 0 };
      } catch (err) {
        console.error('✗ MySQL markPaid error:', err.message);
        throw err;
      }
    } else {
      return new Promise((resolve, reject) => {
        // Try to add the column if it doesn't exist (ignore errors)
        db.run('ALTER TABLE registrations ADD COLUMN paid INTEGER DEFAULT 0', () => {
          const sql = `UPDATE registrations SET paid = 1 WHERE id = ?`;
          db.run(sql, [id], function(err) {
            if (err) {
              console.error('✗ SQLite markPaid error:', err.message);
              return reject(err);
            }
            resolve({ changedRows: this.changes || 0 });
          });
        });
      });
    }
  },

  /**
   * Insert a course registration into the database
   * @param {Object} reg - registration details
   */
  insertRegistration: async ({ name, email, phone, course, level, price, notes }) => {
    if (useMySQL && pool) {
      try {
        const sql = 'INSERT INTO registrations (name, email, phone, course, level, price, notes) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [name, email, phone || '', course, level || '', price || 0, notes || '']);
        return { id: result.insertId };
      } catch (err) {
        console.error('✗ MySQL registration insert error:', err.message);
        throw err;
      }
    } else {
      return new Promise((resolve, reject) => {
        const sql = `INSERT INTO registrations (name, email, phone, course, level, price, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, [name, email, phone || '', course, level || '', price || 0, notes || ''], function(err) {
          if (err) {
            console.error('✗ SQLite registration insert error:', err.message);
            return reject(err);
          }
          resolve({ id: this.lastID });
        });
      });
    }
  }
};
