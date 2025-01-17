const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'your_database_name',
  username: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false // Set to console.log to see SQL queries
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize; 