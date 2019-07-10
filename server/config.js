require('dotenv').config({path: __dirname + '/.env'})

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/healthcare-dapp',
};
