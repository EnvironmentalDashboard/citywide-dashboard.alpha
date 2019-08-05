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

  const EDIT_MODE = 0;
  const KIOSK_MODE = 1;

  /** The amount of time in seconds between views in kiosk mode. */
  const VIEW_DURATION = 10;

  let eventsDict = {
    viewSwitcher: function(glyph) {
      let listener = function() {
        // Stop animations
        Array.from(document.getElementsByClassName("electron")).forEach(elm => elm.setAttribute("style", "display: none;"));
        renderView(glyph.view);
      };

      const event = {
        type: 'click',
        listener
      };

      return event;
    },

    // Shows tooltip on click
    // Replaces div content with properly formatted text
    showTooltip: function(glyph){

      // references the tooltip contents which are from the database
      var tooltipContent = glyph.props.tooltip; // TODO: verify this exists and has valid contents

      let listener = function(evt) {

        // Gets the div which exists in the svg-wrapper
        let tooltip = document.getElementById("tooltip");

        // Clear previous content
        Array.from(tooltip.children).filter(child => child.tagName.toLowerCase() != "span").forEach(child => {tooltip.removeChild(child);});

        // Create header content
        var header = document.createElement("h2");
        var headerNode = document.createTextNode(tooltipContent.header);
        header.appendChild(headerNode);

        // Create <p> content
        var para = document.createElement("p");
        var paraNode = document.createTextNode(tooltipContent.text);
        para.appendChild(paraNode);

        // Add content to div
        // tooltip.appendChild(closeButton);
        tooltip.appendChild(header);
        tooltip.appendChild(para);
  
        // Position tooltip to where the mouse clicked
        tooltip.style.display = "block";
        tooltip.style.left = evt.pageX + 10 + 'px';
        tooltip.style.top = evt.pageY - 100 + 'px';
      };
  
      // Create event for events driver
      const event = {
        type: 'click',
        listener
      };
  
      return event;
    }
  };

  /**
   * Creates an appropriate factory function from a database object that,
   * when executed, produces a glyph object that can be added into the
   * rendering engine.
   * @param {glyph} glyph The database object from which to make an appropriate factory function.
   */
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
   * Update the gauges on the DOM with the links contained in `view.gauges`.
   * @param {JSON} view The view object within a viewController object.
   */
  const updateGauges = view => {
    const gauges = view.gauges;
    for (let i = 0; i < gauges.length; i++) {
      let $gauge = document.getElementById(`gauge-${i + 1}`);
      $gauge.setAttribute('href', gauges[i]);
    }
    return;
  }

  const updateAnimations = view => {
    if (view.animations.includes('pipes')) {
      const flowables = document.getElementsByClassName('flowable-inactive');
      Array.from(flowables).forEach(elmt => {
        elmt.classList.remove('flowable-inactive');
        elmt.classList.add('flowable-active');
      })
    } else {
      const flowables = document.getElementsByClassName('flowable-active');
      Array.from(flowables).forEach(elmt => {
        elmt.classList.remove('flowable-active');
        elmt.classList.add('flowable-inactive');
      })
    }
  }

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
      if (obj.name === 'bird') {
        obj.animators.pathMover.path.coords = 'M2000,350 L600,240 L340,160 L160,40 L80,80 L-600,100';
        obj.animators.pathMover.duration = '7000';
      }
      if (obj.name === 'pipe') {
        obj.animators = {};
      }
      const glyph = factory(obj)();
      dash.addGlyph(glyph);
    });

    dash.render();

    if (EDIT_MODE) {
      let editorDriver = cwd.editorDriver;
      dash.edit(editorDriver);
      console.log('In Edit mode');
    }
  };

  /**
   * Responsible for updating the necessary elements on the DOM to reflect
   * the view specified.
   * @param {JSON} view The view object to render.
   */
  const renderView = view => {
    console.log(`Rendering view: ${view.name}`);
    updateGauges(view);
    updateAnimations(view);
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

  const clearDash = () => {
    const $wrap = document.getElementById('svg-wrap');
    Array.from($wrap.children)
      .filter(child => child.tagName != 'defs')
      .forEach(child => $wrap.removeChild(child));
  };

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
      renderView(views[index]);
    });
    setInterval(function() {
      index++;
      if (index === views.length) index = 0;
      renderView(views[index]);
    }, duration * 1000);
  }
  
  if (KIOSK_MODE) {
    startKiosk(VIEW_DURATION);
  } else {
    console.error('Please enable Kiosk mode.');
  }
})(window.cwd, activeGlyphs);
