// Connect to mongodb
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs')

// Constants
const dburl = 'mongodb://mongoadmin:pass123@159.89.232.129:27017/testdb';

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
      databasess
        .close()
        .then(res => console.log('Connection closed.'))
        .catch(err => {
          console.log('Error closing the connection!');
        });
    })
    .catch(err => reject(err));

  const db = database.db();

var cursor = db.collection('activeGlyphs').find({}).toArray().then(res => fs.writeFile('2pac.txt', JSON.stringify(res), 'ascii', next => {
  console.log('done');
})).catch(err => console.log(err));

// while(cursor.hasNext()) {
//     console.log(JSON.stringify((cursor.next())));
// }

});