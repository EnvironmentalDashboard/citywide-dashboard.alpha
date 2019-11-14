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
  const SHOW_ONE_TITLE = 1;

  /** The amount of time in seconds between views in kiosk mode. */
  const VIEW_DURATION = 10;

  let eventsDict = {
    viewSwitcher: function(glyph) {
      let listener = function() {

        if(window.location.hash) {
          window.location.hash = glyph.view.name;
        }

        if(SHOW_ONE_TITLE) {
          var arr = Array.prototype.slice.call(document.getElementsByClassName("glow-on-hover"));
          arr = arr.slice(0,3);
          var index = arr.indexOf(document.getElementById(this.id));

          arr[index].style.display = "none";
          if (index != arr.length - 1) {
            arr[index+1].style.display = "block";
            renderView(views[index+1]);

          } else {
            arr[0].style.display = "block";
            renderView(views[0]);

          }

        } else {
            renderView(glyph.view);
        }

      };

      const event = {
        type: 'click',
        listener
      };

      return event;
    },

    // Shows tooltip on click
    // Replaces div content with properly formatted text
    showTooltip: function(glyph) {
      // references the tooltip contents which are from the database
      var tooltipContent = glyph.props.tooltip; // TODO: verify this exists and has valid contents

      let listener = function(evt) {
        // Gets the div which exists in the svg-wrapper
        let tooltip = document.getElementById('tooltip');

        // Clear previous content
        Array.from(tooltip.children)
          .filter(child => child.tagName.toLowerCase() != 'span')
          .forEach(child => {
            tooltip.removeChild(child);
          });

        // Create header content
        var header = document.createElement('h2');
        var headerNode = document.createTextNode(tooltipContent.header);
        header.appendChild(headerNode);

        // Create <p> content
        var para = document.createElement('p');
        var paraNode = document.createTextNode(tooltipContent.text);
        para.appendChild(paraNode);

        // Add content to div
        // tooltip.appendChild(closeButton);
        tooltip.appendChild(header);
        tooltip.appendChild(para);

        // Position tooltip to where the mouse clicked
        tooltip.style.display = 'block';
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
   * Takes a messageable, i.e. some object that could have a `messages`
   * attribute that corresponds to a messages array, and
   * assigns a relevant message to the character message box.
   */
  const updateCharacterText = messageable => {
    let characterText = document.getElementById('characterTextP');

    if (messageable.messages) {
      let messages = messageable.messages;

      // Maps each message into an array containing it probability times,
      // then selects a random message from this list.
      // Note that this does not account for probability being an array.
      let probMessages = messages.map(m => {
        let messagesArray = [];

        for (let i = 0; i < m.probability; i++) {
          messagesArray.push(m.text);
        }

        return messagesArray;
      }).flat();

      // Gets a random message from the list of messages.
      let message = probMessages[Math.floor(Math.random() * probMessages.length)];

      characterText.textContent = message;
    }
  };

  /**
   * Update the gauges on the DOM with the links contained in `view.gauges`.
   * @param {JSON} view The view object within a viewController object.
   */
  const updateGauges = view => {
    if (!view.gauges) return;
    const gauges = view.gauges;
    for (let i = 0; i < gauges.length; i++) {
      let $gauge = document.getElementById(`gauge-${i + 1}`);
      $gauge.setAttribute('href', gauges[i]);
    }
    return;
  }

  /**
   * Update the animations on the DOM according to the animations in
   * `view.animations`.
   * @param {JSON} view The view object within a viewController object.
   */
  const updateAnimations = view => {
    if (!view.animations) return;

    const flowables = Array.from(document.getElementsByClassName('flowable'));
    const electrons = Array.from(document.getElementsByClassName('electron'));

    if (view.animations.includes('pipes')) {
      flowables.forEach(elmt => elmt.classList.add('flow-active'));
    } else {
      flowables.forEach(elmt => elmt.classList.remove('flow-active'));
    }

    if (view.animations.includes('electricity')) {
      electrons.forEach(elmt => elmt.classList.add('electron-active'));
    } else {
      electrons.forEach(elmt => elmt.classList.remove('electron-active'));
    }
  };

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
      const glyph = cwd.factory(obj, eventsDict)();
      dash.addGlyph(glyph);

      /**
       * In order for our characterText to be like other elements on the page
       * and not move when the page is resized, we need to calculate
       * the necessary offsets on page load and store them.
       *
       * Longer term, characterText should be linked to some attribute in
       * the database, rather than a hardcoded name (this hardcoding is done
       * due to the October 7 deadline currently).
       */
      if (obj.name === 'flash') {
        let characterText = document.getElementById('characterText');
        let characterTriangle = document.getElementById('characterTriangle');

        let xPercent = (parseFloat(glyph.style.x) + parseFloat(glyph.graphic.width)) / 100.0;
        let yPercent = parseFloat(glyph.style.y) / 100.0;

        let leftOffset = (width * xPercent) + 20;

        characterText.style.left = leftOffset + 'px';
        characterText.style.top = (height * yPercent) + 'px';

        characterTriangle.style.left = (leftOffset * 0.79) + 'px';

        // This function can possibly be trained with more data points.
        characterTriangle.style.top = (height * (0.118049 - 0.0000411079 * height)) + 'px';

        characterTriangle.style.borderWidth = `0 0 ${height * 0.02}px ${width * 0.028}px`;

        // has to fill the area to the left of the gauges
        // this would be better scalable as a maxCharacterWidth option in the database
        characterText.style.maxWidth = (width - leftOffset - (width * 0.25)) + 'px';

        // Activate the display now that we have set the appropriate positioning.
        characterText.style.display = 'block';
      }
    });

    dash.render();

    if (EDIT_MODE) {
      let editorDriver = cwd.editorDriver;
      dash.edit(editorDriver);
      console.log('In Edit mode');
    }

    if (SHOW_ONE_TITLE) {
      for (let i = 0; i < views.length; i++) {
        var elt = document.getElementById(`${views[i].name}Button`);
        if (i != 0) {
          elt.style.display = "none";
        }
        elt.setAttribute("x", "83%");
      }

      for (let j = 1; j < 5; j++) {
        document.getElementById(`gauge-${j}`).setAttribute("height", "22.5%");
        if (j === 3) {
          document.getElementById(`gauge-${j}`).style.y = "53.12%";
        } else if (j === 2) {
          document.getElementById(`gauge-${j}`).style.y = "29.56%";
        } else if (j === 1) {
          document.getElementById(`gauge-${j}`).style.y = "6%";
        }
      }
    }

  };

  /**
   * Responsible for updating the necessary elements on the DOM to reflect
   * the view specified.
   * @param {JSON} view The view object to render.
   */
  const renderView = view => {
    console.log(`Rendering view: ${view.name}`);

    // Remove highlight from previous view and highlight current one
    Array.from(document.getElementsByClassName('currentView'))
      .forEach(elm => {
        elm.classList.remove('currentView');

        if (SHOW_ONE_TITLE)
          elm.style.display = "none";
      });

    let newView = document.getElementById(`${view.name}Button`);
    newView.classList.add('currentView');
    newView.style.display = "block";

    updateCharacterText(view);
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
    views = allGlyphs.filter(obj => obj.view).map(obj => obj.view);
    let index = 0;
    let hashes = views.map(getName);

    function getName(view) {
      return view.name;
    }

    if (window.location.hash) {

      hash = window.location.hash.substr(1,);

      if (!hashes.includes(hash)) {
        console.error('Invalid hash: ' + window.location.hash);
        window.location.hash = '';
      } else {
        index = hashes.indexOf(hash);
      }
    }

    cache(allGlyphs).then(allGlyphs => {
      startEngine(allGlyphs);
      renderView(views[index]);
    });

    if (!window.location.hash) {
      setInterval(function() {
        index++;
        if (index === views.length) index = 0;
        renderView(views[index]);
      }, duration * 1000);
    }
  }

  if (KIOSK_MODE) {
    startKiosk(VIEW_DURATION);
  } else {
    console.error('Please enable Kiosk mode.');
  }
})(window.cwd, activeGlyphs);
