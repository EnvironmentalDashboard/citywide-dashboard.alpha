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

/**
 * Create factory functions to send to the front end.
 * @param {Array} arr from database
 */
function getGlyphFunctions(arr) {
  const functions = [];

  for (let obj of arr) {
    functions.push(obj.getFunction());
  }

  return functions;
}

/**
 * Create factory function to send to the front end.
 * @param {JSON} obj from database
 */
function getFunction(obj) {
  let name = obj.name;
  // parse frameShapes
  let frameShapes = obj.frameShapes ? obj.frameShapes : null;


  const toTheFuture = (props) => {
    let frameShapes = props.frameShapes;
  
      let state = props.state;
  
      return Object.assign(
        state,
        cwd.glyph(state).preventEdits(),
        cwd.graphic(state).shape(frameShapes[0]),
        cwd.fx([
          cwd
            .frameChanger(state)
            .duration(1000)
            .frames(frameShapes),
          cwd
            .pathMover(state)
            .duration(3000)
            .path(path)
        ])
      );
    };
    return toTheFuture;
  };

 module.exports = {getTheBird, getGlyphFunctions};

