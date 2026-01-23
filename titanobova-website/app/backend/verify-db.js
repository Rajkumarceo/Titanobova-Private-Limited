const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'contacts.db');
const db = new sqlite3.Database(DB_FILE);

console.log('\n========================================');
console.log('  DATABASE VERIFICATION REPORT');
console.log('========================================\n');

// Check total records
db.get('SELECT COUNT(*) as count FROM contacts', (err, row) => {
  if (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
  console.log(`✓ Total Records in Database: ${row.count}`);
  
  // Get latest submissions
  db.all('SELECT name, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5', (err, rows) => {
    console.log(`\n✓ Latest 5 Submissions:\n`);
    rows.forEach((row, idx) => {
      console.log(`  ${idx + 1}. ${row.name}`);
      console.log(`     Email: ${row.email}`);
      console.log(`     Subject: ${row.subject}`);
      console.log(`     Date: ${row.created_at}\n`);
    });
    
    // Get all email addresses
    db.all('SELECT DISTINCT email, COUNT(*) as count FROM contacts GROUP BY email ORDER BY count DESC', (err, emails) => {
      console.log(`✓ Unique Email Addresses (${emails.length}):\n`);
      emails.forEach((row) => {
        console.log(`  • ${row.email} (${row.count} submission${row.count > 1 ? 's' : ''})`);
      });
      
      console.log('\n========================================');
      console.log('  ✅ DATABASE IS WORKING CORRECTLY');
      console.log('========================================\n');
      
      db.close();
      process.exit(0);
    });
  });
});
