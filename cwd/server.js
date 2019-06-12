'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var dburl = "mongodb://159.89.232.129:27017/testdb";


// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Connect to mongodb 
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dburl, {useNewUrlParser: true}, function(err, dburl) {
  if(!err) {
    console.log("Connected to mongodb");
  }
  else{
    console.log("Connection to mongodb unsuccessful");
  }
});