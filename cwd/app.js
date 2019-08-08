(function(cwd, activeGlyphs) {
  let svg = document.getElementById('svg-wrap');

  const allGlyphs = activeGlyphs.arr;

  // This makes sure width isn't too big for the screen, and switches to calculate based off of full width
  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  var width = (16 / 9) * height;

  if (
    width >
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth)
  ) {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    height = width * (9 / 16);
  }

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  const EDIT_MODE = 1;
  const KIOSK_MODE = 0;

  /** The amount of time in seconds between views in kiosk mode. */
  const VIEW_DURATION = 10;

  /**
   * Initializes a rendering engine and renders all of the glyphs in the array
   * of database glyph objects.
   * @param {JSON[]} glyphsArr All database objects to render as glyphs in the rendering engine.
   */ 
  const startEngine = glyphsArr => {
    let animationDriver = window.requestAnimationFrame.bind(window);
    let glyphs = JSON.parse(JSON.stringify(glyphsArr));
    let graphicsDriver = cwd.svgDriver(svg);
    let dash = cwd.engine(graphicsDriver, animationDriver);

    glyphs.forEach(obj => {
      // if (glyphObj.name === 'bird' || glyphObj.name === 'cloud' || glyphObj.name === 'powerline') return;
      const glyph = cwd.factory(obj)();
      dash.addGlyph(glyph);
    });

    dash.render();

    if (EDIT_MODE) {
      console.log('In Edit mode');
      let editorDriver = cwd.editorDriver;
      dash.edit(editorDriver);
      let saveButton = document.createElement('button');
      let map = document.getElementById('map');
      map.appendChild(saveButton);
      saveButton.innerText = 'Save Data';
      saveButton.style.padding = '10px';
      saveButton.style.border = '5px solid red';
      saveButton.addEventListener('click', evt => {
        dash.save();
      })
    }
  };

  /**
   * Caches svgContent into each of the glyph objects
   * @param {JSON[]} glyphs array of glyph objects to cache svgContent
   */
  async function cache(glyphs) {
    let promises = [];
    glyphs
      .filter(glyph => glyph.shape === 'svg')
      .forEach(glyph => {
        promises.push(
          fetch(glyph.url)
            .then(response => response.text())
            .then(svgText => {
              glyph.state.graphic.svgContent = svgText;
              return glyph;
            })
        );
      });
    await Promise.all(promises).catch(err => {
      console.error(`Error caching glyphs: ${err}`);
    });
    return glyphs;
  }

  /**
   * Responsible for starting and running kiosk mode by initializing a map 
   * engine and switching views appropriately.
   * @param {Number} duration The time in seconds between switching views. 
   */
  function startKiosk(duration) {
    let views = allGlyphs.filter(obj => obj.view).map(obj => obj.view);
    let index = 0;
    cache(allGlyphs).then(allGlyphs => {
      startEngine(allGlyphs);
      cwd.renderView(views[index]);
    });
    setInterval(function() {
      index++;
      if (index === views.length) index = 0;
      cwd.renderView(views[index]);
    }, duration * 1000);
  }
  
  if (KIOSK_MODE) {
    startKiosk(VIEW_DURATION);
  } else if (EDIT_MODE) {
    let views = allGlyphs.filter(obj => obj.view).map(obj => obj.view);
    let index = 0;
    cache(allGlyphs).then(allGlyphs => {
      startEngine(allGlyphs);
      cwd.renderView(views[index]);
    });

  } else {
  console.error('Please enable Kiosk mode.');
}
})(window.cwd, activeGlyphs);
