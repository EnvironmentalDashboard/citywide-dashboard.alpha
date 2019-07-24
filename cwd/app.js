
(function(cwd, activeGlyphs) {
  
  let svg = document.getElementById("svg-wrap");
  
  const allGlyphs = activeGlyphs.arr;

  // This makes sure width isn't too big for the screen, and switches to calculate based off of full width
  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  
  var width = (16/9) * height;

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
    
    let animationDriver = window.requestAnimationFrame.bind(window);
    let graphicsDriver = cwd.svgDriver(svg);
    let editorDriver = cwd.editorDriver;
  
    let dash = cwd.engine(graphicsDriver, animationDriver);
    const EDIT_MODE = 0;

    let eventsDict = {
      "switchView": function(){
        // switch (this.id) {
        //   case "water":
            
        //     break;
        
        //   default:
        //     break;
        // }
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
            cwd
              .graphic(state)
              .shape(cwd.pathShape().coords(obj.coords || ''))
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

        // Then graphic
        if(glyph.name === "gauge"){
          const shape = cwd
          .svgImageShape()
          .url(glyph.shape || '')
          .size(glyph.props.size || '100%')
          Object.assign(product, cwd.graphic(state).shape(shape).domEffects(glyph.props));
        }
        else{
          const shape = cwd
          .svgShape()
          .url(glyph.shape || '')
          .size(glyph.props.size || '100%')
          Object.assign(product, cwd.graphic(state).shape(shape).domEffects(glyph.props));
      }
        

        // Then events


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
                    .svgShape()
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
  
    allGlyphs.forEach(glyphObj => {
      // if (glyphObj.name === 'bird' || glyphObj.name === 'cloud' || glyphObj.name === 'powerline') return;
      if (glyphObj.name === 'bird') {
        glyphObj.animators.pathMover.path.coords = 'M1200,350 L600,240 L340,160 L160,40 L80,80 L-100,100';
        glyphObj.animators.pathMover.duration = '4000';
      }
      const glyph = factory(glyphObj)();
      dash.addGlyph(glyph);
    });

    dash.render();
  
    if (EDIT_MODE) {
      dash.edit(editorDriver);
      console.log("In Edit mode");
    }

  })(window.cwd, activeGlyphs);  