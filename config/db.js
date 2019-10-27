/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;

/*
This service manages our mongoClient connection, events relating to that connection,
and other useful database related methods.
*/
const DATABASE_NAME = 'safer-db';

const uri = `mongodb://elliot:<dbpassword>@ds239858.mlab.com:39858/safer-app`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, reconnectInterval: 500 });


module.exports = {
  DATABASE_NAME,
  client,
};
