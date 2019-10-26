/* eslint-disable no-console */
/*
This service manages our mongoose connection, events relating to that connection,
and other useful database related methods.
*/

// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'safer-db';

const uri = encodeURI(`mongodb+srv://zni:${process.env.DBPASSWORD}@safer-cluster-ekvvi.azure.mongodb.net/test?retryWrites=true&w=majority`);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  const collection = client.db(DATABASE_NAME).collection('devices');
  // perform actions on the collection object
  client.close();
});
