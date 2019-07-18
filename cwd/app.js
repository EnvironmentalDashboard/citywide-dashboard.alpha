
(function(cwd, activeGlyphs) {
    let svg = document.getElementById("svg-wrap");
  
  const allGlyphs = activeGlyphs.arr;
  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  
  var width = (16/9) * height;
  
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    
    let animationDriver = window.requestAnimationFrame.bind(window);
    let graphicsDriver = cwd.svgDriver(svg);
    let editorDriver = cwd.editorDriver;
  
    let dash = cwd.engine(graphicsDriver, animationDriver);
    const EDIT_MODE = 0;
  
    const tempgauge = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/tempgauge.svg')
        .size('18.2292%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6875%',
          y: '1.852%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const wastewatertreatedgauge = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/wastewatertreatedgauge.svg')
        .size('18.2292%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6875%',
          y: '25%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const watertreatmentelectricgauge = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/watertreatmentelectricgauge.svg')
        .size('18.2292%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6875%',
          y: '48.15%'
        }
      };
  
    return Object.assign(
      state,
      cwd.glyph(state),
      cwd.graphic(state).shape(content)
    );
  };
  
    const drinkinggauge = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/drinkinggauge.svg')
        .size('18.2292%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6875%',
          y: '71.2963%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const factory = glyph => {
      const producePath = obj => {
        let state = obj.state || { graphic: {}, style: {} };

        return Object.assign(
          state,
          cwd.graphic(state).shape(cwd.pathShape().coords(obj.coords || ''))
        );
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

        // Then graphic
        const shape = cwd
          .svgShape()
          .url(glyph.shape || '')
          .size(glyph.props.size || '100%')
        Object.assign(product, cwd.graphic(state).shape(shape).domEffects(glyph.props));

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
  
    allGlyphs.forEach(glyphObj => {
      const glyph = factory(glyphObj)();
      dash.addGlyph(glyph);
    });

    // for (let obj of allGlyphs) {
    //   // if (obj.length === 0) {
    //     const glyph = obj();
    //     dash.addGlyph(glyph);
    //   // } else {
    //     // const glyph = obj(paths[obj.name]());
    //     // dash.addGlyph(glyph);
    //   // }
    // }
  
    // let tweetPath = zigPath();
    // let tweet = bird(tweetPath);
    // let rivers = background();
    // let car = blueCar();
    // dash.addGlyph(rivers);
    // dash.addGlyph(tweet);
    // dash.addGlyph(car);
  
    // const bridgeCar = car();
    // bridgeCar.style.x = '29.167%';
    // bridgeCar.style.y = '33.7963%';
    // dash.addGlyph(bridgeCar);
    dash.render();
  
    if (EDIT_MODE) {
      dash.edit(editorDriver);
      console.log("In Edit mode");
    }

  })(window.cwd, activeGlyphs);  