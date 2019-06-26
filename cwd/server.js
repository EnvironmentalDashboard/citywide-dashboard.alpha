'use strict';

const express = require('express');
const glyphs = require('./cleGlyphs');
const paths = require('./clePaths');
const handler = require('./handler');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();

// Load view engine
app.set('view engine', 'pug');

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.get('/', (req, res) => {
//   if (!err) {
  handler.getTheBird()
    .then(arr => {
      console.log(arr)
      const activeGlyphsStr = JSON.stringify({arr})
      res.render('index', { activeGlyphsStr })
    });
});

app.use(express.static(__dirname));

app.get('/editor', (req, res) => {
  console.log('Received GET request at /editor');
  console.log("is this working?");
  handler.getTheBird();
  //   .then(arr => res.send(arr))
  //   .catch(err => console.log(err));
});

app.get('/testviews', (req, res)=>{
  console.log('Received GET request at /testviews');
  res.render('test');
});

app.get('/', (req, res) => {
  const glyphs = getTheBird();

  const parsed = runtheScript(glyphs);

  res.render('index', { parsed });
});
