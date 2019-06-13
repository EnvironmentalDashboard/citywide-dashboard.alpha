'use strict';

const express = require('express');

// Connect to mongodb
var MongoClient = require('mongodb').MongoClient;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var dburl = 'mongodb://159.89.232.129:27017/testdb';

// App
const app = express();
app.use(express.static(__dirname));
app.use(express.static('./city-editor'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getTheBird() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dburl, { useNewUrlParser: true }, (err, database) => {
      if (!err) {
        console.log('Connected to mongodb');
      } else {
        console.log('Connection to mongodb unsuccessful');
        console.log(err);
        reject(err);
      }

      database
        .db()
        .collection('inventory')
        .find({})
        .toArray()
        .then(result => {
          resolve(result);
          database
            .close()
            .then(res => console.log('Connection closed.'))
            .catch(err => {
              console.log('Error closing the connection!');
            });
        })
        .catch(err => reject(err));
    });
  });
}

app.get('/editor', (req, res) => {
  console.log('Received GET request at /editor');
  getTheBird()
    .then(arr => res.send(arr))
    .catch(err => console.log(err));
});
