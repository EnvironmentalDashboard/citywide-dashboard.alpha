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

  const EDIT_MODE = false;
  const KIOSK_MODE = true;

  let eventsDict = {
    viewSwitcher: function(glyph){
      const name = glyph.view.name;
      const gauges = glyph.view.gauges;
  
      let listener = function() {
        for (let i = 0; i < gauges.length; i++) {
          let $gauge = document.getElementById(`gauge-${i + 1}`);
          $gauge.setAttributeNS('href', gauges[i]);
        }
      };
  
      const event = {
        type: 'click',
        listener
      };
  
      return event;
    }
  };



  const factory = glyph => {
    const producePath = obj => {
      let state = obj.state || { graphic: {}, style: {} };

      if (obj.pathId) {
        return Object.assign(
          state,
          cwd.graphic(state).shape(cwd.pathShape().from(obj.pathId))
        );
      } else {
        return Object.assign(
          state,
          cwd.graphic(state).shape(cwd.pathShape().coords(obj.coords || ''))
        );
      }
    };

    return function() {
      // Set up variables
      let state = glyph.state;
      state._id = glyph._id;
      let product = state;

      // Glyph first
      glyph.props.preventEdits
        ? Object.assign(product, cwd.glyph(state).preventEdits())
        : Object.assign(product, cwd.glyph(state));

      let shape;
      // Then graphic
      switch (glyph.shape) {
        case 'svg':
          shape = cwd
            .svgShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%')
            .content(glyph.state.graphic.svgContent);
          break;

        case 'svgImage':
          shape = cwd
            .svgImageShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%');
          break;

        default:
          shape = cwd
            .svgShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%');
          break;
      }

      Object.assign(
        product,
        cwd
          .graphic(state)
          .shape(shape)
          .props(glyph.props)
      );

      // Then events
      const events = [];
      if (glyph.props.clickEffect && eventsDict[glyph.props.clickEffect]) events.push(eventsDict[glyph.props.clickEffect](glyph));
      Object.assign(product, cwd.events(state).addEvents(events));

      // Then fx
      const fxArray = [];
      for (animatorType in glyph.animators) {
        const animator = glyph.animators[animatorType];
        switch (animatorType) {
          case 'frameChanger':
            const frameShapes = [];
            for (frameURL of animator.frames) {
              frameShapes.push(
                cwd
                  .svgImageShape()
                  .url(frameURL)
                  .size(glyph.props.size || '100%')
              );
            }
            fxArray.push(
              cwd
                .frameChanger(state)
                .duration(animator.duration)
                .frames(frameShapes)
            );
            break;
          case 'pathMover':
            const path = producePath(animator.path);
            fxArray.push(
              cwd
                .pathMover(state)
                .duration(animator.duration)
                .path(path)
                .toSVGGroup(animator.group ? animator.group : null)
            );
          default:
            break;
        }
        Object.assign(product, cwd.fx(fxArray));
      }

      // Then return the whole thing
      return product;
    };
  };

  /**
   * Update the gauges on the DOM with the links contained in `view`
   * @param {JSON} view the view object within a viewController object
   */
  const updateGauges = view => {
    const gauges = view.gauges;
    for (let i = 0; i < gauges.length; i++) {
      let $gauge = document.getElementById(`gauge-${i + 1}`);
      $gauge.setAttribute('href', gauges[i]);
    }
    return;
  }

  /**
   * Render the appropriate view
   * @param {JSON[]} glyphsArr all glyphs
   * @param {String} view view name
   */
  const renderView = (glyphsArr, view) => {

    let animationDriver = window.requestAnimationFrame.bind(window);
    let glyphs = JSON.parse(JSON.stringify(glyphsArr));
    let graphicsDriver = cwd.svgDriver(svg);
    let dash = cwd.engine(graphicsDriver, animationDriver);

    glyphs.forEach(glyphObj => {
      // if (glyphObj.name === 'bird' || glyphObj.name === 'cloud' || glyphObj.name === 'powerline') return;
      const glyph = factory(glyphObj)();
      dash.addGlyph(glyph);
    });

    dash.render();

    if (EDIT_MODE) {
      let editorDriver = cwd.editorDriver;
      dash.edit(editorDriver);
      console.log('In Edit mode');
    }
  };

  const switchView = (glyphsArr, view) => {
    console.log('view is ' + view)
    let viewController = glyphsArr.find(glyph => glyph.view ? glyph.view.name === view : false);
    updateGauges(viewController.view)
  }

  /**
   * Caches svgContent into each of the glyph objects
   * @param {JSON[]} glyphs array of glyph objects to cache svgContent
   * @returns {Promise<JSON[]>}
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

  const clearDash = () => {
    const $wrap = document.getElementById('svg-wrap');
    Array.from($wrap.children)
      .filter(child => child.tagName != 'defs')
      .forEach(child => $wrap.removeChild(child));
  };

  /**
   * 
   * @param {JSON[]} objs Database objects from which to extract view names
   * @returns {String[]} View names  
   */
  const getViews = objs => {
    let views = [];
    objs.filter(obj => obj.view).forEach(obj => views.push(obj.view.name));
    return views;
  };

  if (KIOSK_MODE) {
    let views = getViews(allGlyphs);
    let index = 0;
    cache(allGlyphs).then(allGlyphs => {
      renderView(allGlyphs);
      switchView(allGlyphs, views[index]);
    });
    setInterval(function() {
      index++;
      if (index === views.length) index = 0;
      // renderView(allGlyphs, views[index]);
      switchView(allGlyphs, views[index]);
    }, 10000);
  } else {
    console.error('Please enable Kiosk mode.');
  }
})(window.cwd, activeGlyphs);
