(function(cwd) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '1920px');
  svg.setAttribute('height', '1080px');

  document.getElementById('map').appendChild(svg);

  let animationDriver = window.requestAnimationFrame.bind(window);
  let graphicsDriver = cwd.svgDriver(svg);
  let editorDriver = cwd.editorDriver;

  let dash = cwd.engine(graphicsDriver, animationDriver);
  const EDIT_MODE = 0;

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
    let frames = [
      cwd
        .svgImageShape()
        .url('./images/bird/1.svg')
        .size('150px'),
      cwd
        .svgImageShape()
        .url('./images/bird/2.svg')
        .size('150px'),
      cwd
        .svgImageShape()
        .url('./images/bird/3.svg')
        .size('150px'),
      cwd
        .svgImageShape()
        .url('./images/bird/4.svg')
        .size('150px')
    ];

    let state = {
      graphic: {},
      style: {
        x: 500,
        y: 500
      }
    };

    return Object.assign(
      state,
      cwd.glyph(state).preventEdits(),
      cwd.graphic(state).shape(frames[0]),
      cwd.fx([
        cwd
          .frameChanger(state)
          .duration(1000)
          .frames(frames),
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
      .size('1920px', '1080px');

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

  const car = () => {
    let content = cwd
      .svgImageShape()
      .url('./images/carblue.svg')
      .size('50px');

    let state = {
      graphic: {},
      style: {
        x: 890,
        y: 335
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
      .size('360px');

    let state = {
      graphic: {},
      style: {
        x: 225,
        y: 75
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
      .size('400px');

    let state = {
      graphic: {},
      style: {
        x: 629,
        y: 160
      }
    };

    return Object.assign(
      state,
      cwd.glyph(state),
      cwd.graphic(state).shape(content)
    );
  };

  const downtown = () => {
    let content = cwd
      .svgImageShape()
      .url('./images/Cledowntownbuildings.svg')
      .size('500px');

    let state = {
      graphic: {},
      style: {
        x: 775,
        y: 100
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
      .size('300px');

    let state = {
      graphic: {},
      style: {
        x: 1225,
        y: 315
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
      .size('450px');

    let state = {
      graphic: {},
      style: {
        x: 945,
        y: 605
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
      .size('625px');

    let state = {
      graphic: {},
      style: {
        x: 390,
        y: 787
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
      .size('250px');

    let state = {
      graphic: {},
      style: {
        x: 920,
        y: 400
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
      .size('430px');

    let state = {
      graphic: {},
      style: {
        x: 422,
        y: 275
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
      .size('500px');

    let state = {
      graphic: {},
      style: {
        x: -25,
        y: 565
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
    crib,
    glsc,
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
  bridgeCar.style.x = 560;
  bridgeCar.style.y = 365;
  dash.addGlyph(bridgeCar);
  dash.render();

  if (EDIT_MODE) {
    dash.edit(editorDriver);
  }
})(window.cwd);
