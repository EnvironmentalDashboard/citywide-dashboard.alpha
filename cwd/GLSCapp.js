
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
              .coords('M1920,1080 L1500,900 L1000,800 L900,400 L240,160 L160,40 L80,80 L-1000,300')
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
            .duration(10000)
            .path(path)
        ])
      );
    };
  
    const background = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/greenbackgroundscwd.svg')
        .size('100%', '100%');
  
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
  
    const river1 = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/justrivers.svg') // todo remove
        .size('1920px', '1080px');
  
  
      let state = {
        graphic: {},
        style: {
          fill: "url('#myGradient')"
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state).preventEdits(),
        cwd.graphic(state).shape(content),
        cwd
          .graphic(state)
          .shape(
            cwd
              .pathShape()
              .coords('M1292.2,177.5c5.8,10.6,15.9,14.2,22.3,24.5c25.1,41.6,13.4,98.7,34.6,145.4c9.6,21.1,27.3,38.3,42.4,56.8 c92,113,83.1,276.3,188.8,379.2c3.2,3,13.3,13.4,25.5,28.4c22,27.3,33,48.8,52.4,87.4c0,0,9.5,19,26,76.4c0.2,1,0.8,2.9,0.9,5.3v1 c0,1.2-0.2,2.5-0.6,3.9c-1.1,4.2-3.6,6.8-4.2,7.6c-3.3,3.8-6.9,13.1-7.8,37.1c2.5,8.1,4.4,18.2,3.8,29.6 c-0.2,4.7-0.6,10.9-2.6,17.9h-157.6c-1.4-14.4,1.8-18.6,4.9-20c3.8-1.6,7.2,1.7,15.7,2.5c9.6,0.9,16.7-2.2,25.1-5.8 c8.8-3.8,17.8-7.6,23.3-16.1c3.5-5.2,1.3-5.9,5.3-22.9c3.7-16,6.1-18,5.2-25.6c-0.8-7.6-3.4-8.5-6.5-18.1 c-3.7-12.1-0.5-13.9-2.4-30.9c-1.6-14.8-4.1-15.2-6.9-34.9c-1.6-11-1.1-12.8-2.1-21.9c-2.1-17.6-6.5-30.8-10.1-41.4 c-11.5-34.5-31.4-65-39.4-76.8c-46.3-74.1-62.6-128.8-68.6-166.1c-3.3-20.6-10.6-80.6-55.3-143.5c-22.4-29.9-39.1-48.2-51.9-64.5 c-12.7-16.3-21.5-30.8-27.8-52.9c-11.4-39.7,0.9-82.8-16.2-120.8c-6.2-13.8-20.7-32.1-22.3-34.6c-17.4-24.5-34.1-42.5-54.4-59.2 l337.1-13.5c-0.5,0.4-8.9,12-9.4,19.2c-0.4,7.6,5,14.7,10.5,20.6c13.3,14.5,28.6,27.5,45.6,38.5c19,12.3,40.9,23.1,52.1,41.4 c7.8,12.7,9.5,27.5,11.8,41.8c1.5,9.6,3.4,19.2,5.6,28.7v116.1c-8.2-23-15.2-46.4-21.6-69.7c-9.1-33-17.2-66.2-24.5-99.6 c-1.7-7.7-3.3-15.6-7.6-22.4c-4.4-7.2-11.3-13-18-18.6c-24.7-20.6-49.2-41-73.9-61.6c-3.8-3.1-7.7-6.3-12.2-8.4 c-17.1-7.9-36.3,2-54.4,6.7c-34.2,8.9-72.1-1.7-107.3,4.3c-24,4.1-46.5,9.8-71.7,6C1281.1,155.6,1286.3,167,1292.2,177.5z')
          )
      );
    }
  
    const river2 = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/justrivers.svg')
        .size('1920px', '1080px');
  
  
      let state = {
        graphic: {},
        style: {
          fill: "url('#myGradient')"
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state).preventEdits(),
        cwd.graphic(state).shape(content),
        cwd
          .graphic(state)
          .shape(
            cwd
              .pathShape()
              .coords('M1224.6,1075.8c-14.1-34.6-28.6-61.8-40-80.9c-27.3-45.7-37.1-47.3-81.2-106.4c0,0-20.3-27.2-42.4-43.6 c-10.1-7.6-17.8-11.7-22.7-14.5c-32-18.3-54.8-45-71.9-65c-35.8-41.8-26.4-49.3-67.6-100.9c-12.3-15.5-22.7-33-34.9-48.7 c-8.8-11.1-19.9-21.5-20.4-36.6c-0.3-9.9-0.7-19.5,2.9-28.5c9.4-24.1,19.5-49.2,37.1-65.8c7.6-7.2,16.7-12.9,21.6-22.8 c9.7-19.6-3.2-46.1-21-55c-17.8-8.8-37.9-5-56.8-1.2c-31.8,6.5-63.8,13.1-95.6,19.6c-6.2,1.3-14.2,1.6-17-5 c-1.6-3.7-0.8-8.2,0.1-12.3c7.8-33.8,22.5-65.4,42.7-91.2c4.8-6.2,10.2-12.5,11.9-20.7c5.6-25.7-24.1-41.5-18.3-67.2 c0.3-1.3,4.2-8,11.9-21.3c10.1-17.2,15.2-26.3,22.5-36.9c6.2-9.1,15.4-13.6,27.8-27.5c-9.7,0.4-19.5,3.9-29.2,4.3 c-4.2,12.6-10.9,17.2-21.2,33.8c-14.2,22.7-30.2,38.6-42.7,49.1c-15.5-2.3-33.9,0.8-49.5,3.3c-8.5,1.5-17.9,4.2-26.3,0.8 c-6.8-2.8-9.8-11.1-8.1-20.6c-5,4.9-16,13.3-21.1,16.2c-7.3,4.2-30.6,3.3-34.7,3.7c-3.3,0.4,1.1-9.3,6.1-14.5 c5.3-5.4-20.2,8-22.8,9.3c-7.7,4.1-18.3,1.1-26.5,0.4c-13-1.1-29.6,4.4-38.5,0.4c12.1,6.5,43.1,5.6,55.6,11.9 c51.8,26.4,103.6,2.3,155.9,13.5c10.1,2.1,20.6,6.4,25.7,17c7.4,15.1,6.2,34.2-3.7,47.1c-14.2,18.4-33.4,30.8-47.2,49.6 c-13.9,18.8-21.2,48.8-8,68.2c9.9,14.5,27.6,17.5,43.4,16.2c49.6-4.5,98.5-42.6,145.9-24.5c1.3,19.9-11.8,37.3-26.1,47.7 c-14.3,10.5-30.8,17-43.8,29.7c-11.7,11.5-19.8,27.3-30.8,39.8c-13.4,15.1-30.5,24.5-47.2,33.4c-24.9,13.3-50.3,26.1-76.8,33.8 c-29,8.5-59.1,10.5-88.8,15.6c-65.8,11.5-128.9,38.6-189.6,70.5c32.2-9.5,64.4-19.1,96.7-28.8c24-7.2,48.1-14.3,72.7-16.7 c22.5-2.3,45.2-0.4,67.8-2c39.8-2.8,83-16,118.2-38.7c21.5-13.9,42-31.8,62.3-17c18.2,13.3,17.1,48.9,3.7,68.7s-33.3,20.4-50.7,35 c-31.7,26.5-72.9,32.4-105,39c-19.2,4-30.6,4.9-49.7,9.8c-14.9,4-29.3,6.1-43.8,11.8c-27.1,10.6-58.2,21.3-83.1,37.5 c-13.8,9-26.8,15-39.8,25.6c-29.8,24.5-54.8,57.7-91.5,79.3c-7.7,4.5-12.6,8.2-16.7,12.1c0,0-10.5,9.3-19.6,23.1 c-10.7,16.2-33.2,67.2-56.8,139c68.7,0.4,137.5,0.9,206.2,1.3c-36.3-35.9-47.2-52.9-48.3-61c-0.1-1.1-0.7-6.4-2.4-13.3 c-1.3-5.7-2.5-8.1-4.8-15.9c0,0-1.7-6.1-3.4-12.9c-2.7-11.1-1.3-38.2,15.2-65.2c10.6-17.1,22-27.6,35.7-40.8 c13.8-13.3,27.1-29,43.4-39.3c16.3-10.1,35.5-14.3,52.9-18.6c12.3-2.9,24.8-10.5,37.1-13.4c15.1-3.6,30-10.3,44.7-15.9 c23.2-8.8,47.9-14.6,71.9-23.6c20.6-7.8,40.4-18.2,58.1-31.2c24.4-17.8,38.7-20.8,67.4-31.3c3-1.2,2.9-0.4,5.6-0.8 c22.1-4.1,25.2-14.5,33.3-13.4c14.3,1.7,13.9,34.5,41.9,59.5c2.9,2.7,3.4,2.7,6.4,5.4c11.9,11.7,14.6,21.1,26,41.1 c8.2,14.7,18.4,28.4,38.9,55.7c36.3,48.7,61.4,63.4,86.1,92.8c22.3,26.5,49.2,69.4,61.3,140.6L1224.6,1075.8z')
          )
      );
    }
  
    const river3 = () => {
      let content = cwd
        .svgImageShape()
        .url('./images/justrivers.svg')
        .size('1920px', '1080px');
  
  
      let state = {
        graphic: {},
        style: {
          fill: "url('#myGradient')"
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state).preventEdits(),
        cwd.graphic(state).shape(content),
        cwd
          .graphic(state)
          .shape(
            cwd
              .pathShape()
              .coords('M98.1,321.5c1.9-1.6,4.5-4.1,7-7.8c2.8-4.2,4-7.8,4.5-9.4c3-8.4,8.2-11.7,26.6-38.3c4.9-7.1,4.9-7.1,9.8-17.2 l-13.6-4.9c-3.6,13.1-8.6,20.9-16.8,30.2c-5.3,6.1-10.6,12.1-16,18.1c-3.6,4.1-7.3,8.2-9.8,13.3c-9,18.1-6.2,39.9-4.1,52.1 c3.2,18.9,7.1,17.7,8.3,33.3c1.3,17-3.6,16.8-2.4,37c0.5,9,2.5,18.2,2.1,34.6c-0.1,4.4-0.3,8.7-1.2,12.8 c-1.5,6.7-4.6,12.5-7.9,18.2c-7,12-14.7,23.5-23,34.5l1.7-3.4c-9.9,11.5-20,23.1-31.7,31.8c-15.1,11-13.8,6.3-29.6,16.2v179.5 c11.2-11,16.9-26,20.6-42.6c2.5-10.8,3-21.9,3.8-33.1c1.2-15.4,2.9-30.8,5.2-45.9c1.3-9.2,6-13.7,6.6-24.2c0.7-9.8-1.6-12-0.8-18.9 c1.1-9.2,6.5-16.4,19.8-28.6c20.8-19.1,24.3-17.2,32.8-26.5c16.1-17.8,18.6-42.2,20.9-63c0.5-5.5,1.7-18.9-2.9-59.5 c-2.1-18.1-5.4-42.6-11-71.8C97.5,332.6,97.9,327,98.1,321.5z')
          )
      );
    }
  
    const riversGradient = () => {
      let content = cwd
        .svgGradient()
        .addStop({offset:'30%', 'stop-color':'#2980b9'})
        .addStop({offset:'70%','stop-color':'#3498db'})
        .id('myGradient');
  
      let state = {
        graphic: {},
        style: {}
      };
    
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content),
        cwd.fx([cwd.gradientChanger(state).duration(5000)])
      );
    }

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
  
    const gaugeone = () => {
      let content = cwd
        .svgImageShape()
        .url('https://oberlin.environmentaldashboard.org/gauges/gauge.php?rv_id=2998&meter_id=2961&color=%23ecf0f1&bg=%232ecc71&height=190&width=290&font_family=Futura%2C+Helvetica%2C+sans-serif&title=Electricity+use&title2=&border_radius=3&rounding=0&ver=svg&units=')
        .size('20%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6%',
          y: '0%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const gaugetwo = () => {
      let content = cwd
        .svgImageShape()
        .url('https://oberlin.environmentaldashboard.org/gauges/gauge.php?rv_id=2999&meter_id=2964&color=%23ecf0f1&bg=%232ecc71&height=190&width=290&font_family=Futura%2C+Helvetica%2C+sans-serif&title=Water+use&title2=&border_radius=3&rounding=0&ver=svg&units=')
        .size('20%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6%',
          y: '25.56%'
        }
      };
  
      return Object.assign(
        state,
        cwd.glyph(state),
        cwd.graphic(state).shape(content)
      );
    };
  
    const gaugethree = () => {
      let content = cwd
        .svgImageShape()
        .url('https://oberlin.environmentaldashboard.org/gauges/gauge.php?rv_id=3000&meter_id=2969&color=%23ecf0f1&bg=%232ecc71&height=190&width=290&font_family=Futura%2C+Helvetica%2C+sans-serif&title=Gas+use&title2=&border_radius=3&rounding=0&ver=svg&units=')
        .size('20%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6%',
          y: '51.12%'
        }
      };
  
    return Object.assign(
      state,
      cwd.glyph(state),
      cwd.graphic(state).shape(content)
    );
  };
  
    const gaugefour = () => {
      let content = cwd
        .svgImageShape()
        .url('https://oberlin.environmentaldashboard.org/gauges/gauge.php?rv_id=3001&meter_id=2962&color=%23ecf0f1&bg=%232ecc71&height=190&width=290&font_family=Futura%2C+Helvetica%2C+sans-serif&title=Production+%28wind%29&title2=&border_radius=3&rounding=0&ver=svg&units=')
        .size('20%');
  
      let state = {
        graphic: {},
        style: {
          x: '79.6%',
          y: '76.7%'
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
      river1,
      river2,
      river3,
      riversGradient,
      TextBanner,
      CWDText,
      CWDIcon,
      gaugeone,
      gaugetwo,
      gaugethree,
      gaugefour,
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