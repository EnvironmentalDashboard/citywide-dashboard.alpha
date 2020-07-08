'use strict';

const express = require('express');
const handler = require('./handler');
const router = express.Router();

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

const PATH = '/' + (process.env.PATH_PREFIX || '');

// App
const app = express();

// Load view engine
app.set('view engine', 'pug');

app.listen(PORT, HOST);
app.use(PATH, router);
console.log(`Running on ${HOST}:${PORT}${PATH}`);

router.get('/', (req, res) => {
  res.redirect(process.env.PATH_PREFIX ? (PATH + '/index') : '/index');
});

router.get('/index', (req, res) => {
  handler.getTheBird().then(arr => {
    const activeGlyphsStr = JSON.stringify({ arr });
    res.render('index', { activeGlyphsStr, api_url: process.env.API_URL });
  });
});

router.use(express.static(__dirname));

router.get('/editor', (req, res) => {
  console.log('Received GET request at /editor');
  res.sendStatus(200);
});
