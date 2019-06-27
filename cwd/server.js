'use strict';

const express = require('express');
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
  handler.getTheBird().then(arr => {
    const activeGlyphsStr = JSON.stringify({ arr });
    res.render('index', { activeGlyphsStr });
  });
});

app.use(express.static(__dirname));

app.get('/editor', (req, res) => {
  console.log('Received GET request at /editor');
  res.sendStatus(200);
});
