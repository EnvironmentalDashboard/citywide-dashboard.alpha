
(function(cwd) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
  
  
  var height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  
  var width = (16/9) * height;

  // This makes sure width isn't too big for the screen, and switches to calculate based off of full width
  if(width > (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)){
    width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    height = width * (9/16);
  }
  
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    // svg.setAttribute('viewbox', '0 0 100 100');

    document.getElementById('map').appendChild(svg);
  
    let animationDriver = window.requestAnimationFrame.bind(window);
    let graphicsDriver = cwd.svgDriver(svg);
    let editorDriver = cwd.editorDriver;
  
    let dash = cwd.engine(graphicsDriver, animationDriver);
    const EDIT_MODE = 0;
    console.log(EDIT_MODE);
  
    const zigPath = () => {
      let state = {
        graphic: {},
        style: {}
      };
  
      return Object.assign(
        state,
        cwd
          .graphic(state)
          .shape(
            cwd
              .pathShape()
              .coords('M500,250 L400,240 L240,160 L160,40 L80,80 L-100,100')
          )
      );
    };
  
    const bird = path => {
      let frameShapes = [
        cwd
          .svgImageShape()
          .url('./images/bird/1.svg')
          .size('7.8125%'),
        cwd
          .svgImageShape()
          .url('./images/bird/2.svg')
          .size('7.8125%'),
        cwd
          .svgImageShape()
          .url('./images/bird/3.svg')
          .size('7.8125%'),
        cwd
          .svgImageShape()
          .url('./images/bird/4.svg')
          .size('7.8125%')
      ];
  
      let state = {
        graphic: {},
        style: {
          x: '26.0417%',
          y: '46.2963%'
        }
      };
  
      // TODO: get rid of preventEdits residue
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
  
    const background = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/riverscwd.svg')
        .size(width, height);
  
      let state = {
        graphic: {},
        style: {}
      };
  
      return Object.assign(
        state,
        cwd.glyph(state).preventEdits(),
        cwd.graphic(state).shape(content)
      );
    };

    const TextBanner = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/Sciencecenter_text.svg')
        .size('20%');
  
      let state = {
        graphic: {},
        style: {
          x: '10.25%',
          y: '7.5%'
        }
      };

      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };

      const CWDIcon = () => {
        let content = cwd
          .svgImageShape()
          .url('./images/CWDIcon.svg')
          .size('10%');
    
        let state = {
          graphic: {},
          style: {
            x: '0%',
            y: '0%'
          }
        };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };

    const CWDText = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/citywidedashboard_text.svg')
        .size('40%');
  
      let state = {
        graphic: {},
        style: {
          x: '10%',
          y: '0%'
        }
      };

      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
    const car = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/carblue.svg')
        .size('2.60417%');
  
      let state = {
        graphic: {},
        style: {
          x: '45%',
          y: '31.5%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
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
  
    const crib = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/clecrib.svg')
        .size('18.75%');
  
      let state = {
        graphic: {},
        style: {
          x: '11.71875%',
          y: '6.9444%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const glsc = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/GLSCisland.svg')
        .size('20.833%');
  
      let state = {
        graphic: {},
        style: {
          x: '32.76%',
          y: '14.815%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const turbines = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/turbineblades.svg')
        .size('3.333%');
  
      let state = {
        graphic: {},
        style: {
          x: '35.625%',
          y: '17.222%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content),
        cwd.fx([
          cwd
            .rotator(state)
            .duration(3000)
        ])
      )
    }
  
    const downtown = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/Cledowntownbuildings.svg')
        .size('26.0417%');
  
      let state = {
        graphic: {},
        style: {
          x: '40.364583%',
          y: '9.2593%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const townhouses = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/townhousesisland.svg')
        .size('15.625%');
  
      let state = {
        graphic: {},
        style: {
          x: '63.80208%',
          y: '29.167%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const waterTreatment = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/Watertreatmentplant.svg')
        .size('23.4375%');
  
      let state = {
        graphic: {},
        style: {
          x: '49.21875%',
          y: '56.0185%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const housesIsland = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/housesisland.svg')
        .size('32.5521%');
  
      let state = {
        graphic: {},
        style: {
          x: '20.3125%',
          y: '72.8704%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const tram = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/RTAtram.svg')
        .size('13.02083%');
  
      let state = {
        graphic: {},
        style: {
          x: '47.9167%',
          y: '37.037%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const bridge = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/bridge.svg')
        .size('22.396%');
  
      let state = {
        graphic: {},
        style: {
          x: '21.98%',
          y: '25.463%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const agricultureIsland = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/Agricultureisland.svg')
        .size('25%');
  
      let state = {
        graphic: {},
        style: {
          x: '0%',
          y: '52.3148%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const paths = {
      bird: zigPath
    };
  
    let allGlyphs = [
      background,
      TextBanner,
      CWDText,
      CWDIcon,
      tempgauge,
      wastewatertreatedgauge,
      watertreatmentelectricgauge,
      drinkinggauge,
      crib,
      glsc,
      turbines,
      downtown,
      car,
      townhouses,
      waterTreatment,
      housesIsland,
      agricultureIsland,
      tram,
      bridge,
      bird
    ];
  
    for (let obj of allGlyphs) {
      if (obj.length === 0) {
        const glyph = obj();
        dash.addGlyph(glyph);
      } else {
        const glyph = obj(paths[obj.name]());
        dash.addGlyph(glyph);
      }
    }
  
    // let tweetPath = zigPath();
    // let tweet = bird(tweetPath);
    // let rivers = background();
    // let car = blueCar();
    // dash.addGlyph(rivers);
    // dash.addGlyph(tweet);
    // dash.addGlyph(car);
  
    const bridgeCar = car();
    bridgeCar.style.x = '29.167%';
    bridgeCar.style.y = '33.7963%';
    dash.addGlyph(bridgeCar);
    dash.render();
  
    if (EDIT_MODE) {
      dash.edit(editorDriver);
      console.log("In Edit mode");
    }
  })(window.cwd);  