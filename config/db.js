const { Pool } = require('pg');


const pool = new Pool({
  host: 'localhost',
  user: 'postgres',         
  password: '1234',         
  database: 'secretariatecnica',
  port: 5432,               
  max: 10,                  
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000 
});

module.exports = pool;
