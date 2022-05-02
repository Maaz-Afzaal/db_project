const mysql = require('mysql2');

const HOST = 'remotemysql.com';
const USER = 'jqoM6B1zHK';
const PASSWORD = 'qnPALFY6r6';
const DBNAME = 'jqoM6B1zHK';


const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DBNAME,
  multipleStatements: true
});

con.connect(function(err) {
  if (err) {
    console.log('ERROR: '+err);
    console.log('FATAL: '+err.fatal);
  }
});

process.on('SIGINT', ()=>{
    con.end((err) => {
      console.clear();
      console.log('Database Disconnected');
    });
    process.exit(0);
  });

module.exports = con;