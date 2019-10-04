// Connect to mongodb
var MongoClient = require('mongodb').MongoClient;

// Constants
const dburl = 'mongodb://cwd-mongo:27017/cleveland-cwd';

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
        .collection('activeGlyphs')
        .find({})
        .sort({ layer: 1 })
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

module.exports = { getTheBird };
