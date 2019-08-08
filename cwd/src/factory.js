let eventsDict = {
  viewSwitcher: function(glyph) {
    let listener = function() {
      cwd.renderView(glyph.view);
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
  },

  edit: function(glyph) {
    let listener = cwd.editorDriver(glyph);

    return {
      type: 'load',
      listener
    }
  }
};

/**
 * Creates an appropriate factory function from a database object that,
 * when executed, produces a glyph object that can be added into the
 * rendering engine.
 * @param {glyph} glyph The database object from which to make an appropriate factory function.
 */
export const factory = glyph => {
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

    // TODO: Deal with this to figure out click effects and etc. while edit
    // mode is on.
    // Then events
    const events = [];
    if (glyph.props.clickEffect && eventsDict[glyph.props.clickEffect]) ;
      // events.push(eventsDict[glyph.props.clickEffect](glyph));
    events.push(eventsDict.edit(glyph));
    Object.assign(product, cwd.events(state).addEvents(events));

    // Then fx
    const fxArray = [];
    for (let animatorType in glyph.animators) {
      const animator = glyph.animators[animatorType];
      switch (animatorType) {
        case 'frameChanger':
          const frameShapes = [];
          for (let frameURL of animator.frames) {
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
