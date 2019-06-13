'use strict';

const express = require('express');
const glyphs = require('./cleGlyphs');
const paths = require('./clePaths');
const handler = require('./handler');

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

// MongoClient.connect(dburl, { useNewUrlParser: true }, (err, database) => {
//   if (!err) {
//     console.log('connected to mongodb');
//   }

//   database
//     .db()
//     .collection('activeGlyphs')
//     .findOneAndUpdate({ name: 'bird' }, { $set: { path: paths.zigPath } });
// });

app.get('/editor', (req, res) => {
  console.log('Received GET request at /editor');
  handler.getTheBird();
  //   .then(arr => res.send(arr))
  //   .catch(err => console.log(err));
});

// app.get('/', (req, res) => {
//   const glyphs = getTheBird();

//   const parsed = runtheScript(glyphs);

//   res.render('index', { parsed });
// });
