const _bird = {
  name: 'bird',
  layer: 5,
  frameShapes: [
    {
      type: 'svgImageShape',
      chain: [
        { name: 'url', args: './images/bird/1.svg' },
        {
          name: 'size',
          args: '150px'
        }
      ]
    },
    {
      type: 'svgImageShape',
      chain: [
        { name: 'url', args: './images/bird/2.svg' },
        {
          name: 'size',
          args: '150px'
        }
      ]
    },
    {
      type: 'svgImageShape',
      chain: [
        { name: 'url', args: './images/bird/3.svg' },
        {
          name: 'size',
          args: '150px'
        }
      ]
    },
    {
      type: 'svgImageShape',
      chain: [
        { name: 'url', args: './images/bird/4.svg' },
        {
          name: 'size',
          args: '150px'
        }
      ]
    }
  ],
  state: {
    graphic: {},
    style: {
      x: 500,
      y: 500
    }
  },
  composite: [
    {
      name: 'glyph',
      chain: [
        {
          name: 'preventEdits',
          args: null
        }
      ]
    },
    {
      name: 'graphic',
      chain: [
        {
          name: 'shape',
          args: '_frameShapes[0]'
        }
      ]
    },
    {
      name: 'fx',
      animators: [
        {
          type: 'frameChanger',
          duration: 1000,
          frames: '_frameShapes'
        },
        {
          type: 'pathMover',
          duration: 3000,
          path: '_path'
        }
      ],
      chain: null
    }
  ]
}; 

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
    cwd.graphic(state).shape(cwd
      .svgImageShape()
      .url('./images/carblue.svg')
      .size('50px'))
  );
};

const carObj = {
  name: 'car',
  url: './images/carblue.svg',
  size: '50px',
  state: {
    graphic: {},
    style: {
      x: 890,
      y: 335
    }
  },
  glyph: {},
  graphic: {},
}

const birdObj = {
  name: 'bird',
  url: './images/bird/1.svg',
  size: '150px',
  state: {
    graphic: {},
    style: {
      x: 500,
      y: 500
    }
  },
  glyph: {},
  graphic: {},
  animations: {
    frameChanger: {
      duration: 1000,
      frames: [
        {
          url: './images/bird/1.svg',
          size: '150px'
        },
        {
          url: './images/bird/2.svg',
          size: '150px'
        },
        {
          url: './images/bird/3.svg',
          size: '150px'
        },
        {
          url: './images/bird/4.svg',
          size: '150px'
        }
      ]
    },
    pathMover: {
      duration: 3000,
      path: {
        coords: 'M500,250 L400,240 L240,160 L160,40 L80,80 L-100,100'
      }
    }
  }
}

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

let glyphTemplate = {
  state: {
    graphic: {},
    style: {}
  },
  composite: [
    {
      name: '',
      chain: [
        {
          name: '',
          args: '_variable'
        }
      ]
    },
    {
      name: 'fx',
      animators: [
        {
          type: '',
          duration: null,
          frames: null,
          path: null
        }
      ],
      chain: null
    }
  ]
};

let pathTemplate = {
  state: {
    graphic: {},
    style: {}
  },
  composite: [
    {
      name: '',
      chain: [
        {
          name: 'shape',
          args: {
            type: '',
            chain: [
              {
                name: '',
                args: ''
              }
            ]
          }
        }
      ]
    }
  ]
};

const pathDictionary = {
  bird: 'zigPath'
};

module.exports.bird = bird;
