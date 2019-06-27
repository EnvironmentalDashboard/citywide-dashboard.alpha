const bird = {
  name: 'bird',
  shape: './images/bird/1.svg',
  state: {
    graphic: {},
    style: {
      x: '26.0417%',
      y: '46.2963%'
    }
  },
  props: {
    size: '7.8125%',
    preventEdits: true
  },
  animators: {
    frameChanger: {
      duration: 1000,
      frames: [
        './images/bird/1.svg',
        './images/bird/2.svg',
        './images/bird/3.svg',
        './images/bird/4.svg'
      ]
    },
    pathMover: {
      duration: 3000,
      path: {
        state: {
          graphic: {},
          style: {}
        },
        coords: 'M500,250 L400,240 L240,160 L160,40 L80,80 L-100,100'
      }
    }
  }
};

const background = {
  name: 'background',
  shape: './images/riverscwd.svg',
  state: {
    graphic: {},
    style: {}
  },
  props: {
    size: '100%'
  },
  animators: {},
  layer: 1
};

// TODO: Needs layer
const car = {
  name: 'car',
  shape: './images/carblue.svg',
  state: {
    graphic: {},
    style: {
      x: '45%',
      y: '31.5%'
    }
  },
  props: {
    size: '2.60417%'
  },
  animators: {}
};

const crib = {
  name: 'crib',
  shape: './images/clecrib.svg',
  state: {
    graphic: {},
    style: {
      x: '11.72%',
      y: '6.94%'
    }
  },
  props: {
    size: '18.75%'
  },
  animators: {},
  layer: 5
};

const glsc = {
  name: 'glsc',
  shape: './images/GLSCisland.svg',
  state: {
    graphic: {},
    style: {
      x: '32.76%',
      y: '14.19%'
    }
  },
  props: {
    size: '20.83%'
  },
  animators: {},
  layer: 5
};

const downtown = {
  name: 'downtown',
  shape: './images/Cledowntownbuildings.svg',
  state: {
    graphic: {},
    style: {
      x: '60.46%',
      y: '9.26%'
    }
  },
  props: {
    size: '26.04%'
  },
  animators: {},
  layer: 5
};

const townhouses = {
  name: 'townhouses',
  shape: './images/townhousesisland.svg',
  state: {
    graphic: {},
    style: {
      x: '63.80%',
      y: '29.17%'
    }
  },
  props: {
    size: '15.63%'
  },
  animators: {},
  layer: 5
};

const waterTreatment = {
  name: 'waterTreatment',
  shape: './images/Watertreatmentplant.svg',
  state: {
    graphic: {},
    style: {
      x: '49.22%',
      y: '56.02%'
    }
  },
  props: {
    size: '23.44%'
  },
  animators: {},
  layer: 5
};

const housesIsland = {
  name: 'housesIsland',
  shape: './images/housesisland.svg',
  state: {
    graphic: {},
    style: {
      x: '20.31%',
      y: '72.87%'
    }
  },
  props: {
    size: '32.55%'
  },
  animators: {},
  layer: 5
};

const tram = {
  name: 'tram',
  shape: './images/RTAtram.svg',
  state: {
    graphic: {},
    style: {
      x: '47.91%',
      y: '37.03%'
    }
  },
  props: {
    size: '13.02%'
  },
  animators: {},
  layer: 5
};

const bridge = {
  name: 'bridge',
  shape: './images/bridge.svg',
  state: {
    graphic: {},
    style: {
      x: '21.98%',
      y: '25.46%'
    }
  },
  props: {
    size: '22.40%'
  },
  animators: {},
  layer: 5
};

const agricultureIsland = {
  name: 'agricultureIsland',
  shape: './images/Agricultureisland.svg',
  state: {
    graphic: {},
    style: {
      x: '0%',
      y: '52.31%'
    }
  },
  props: {
    size: '25%'
  },
  animators: {},
  layer: 5
};

const industryIsland = {
  name: 'industryIsland',
  shape: './images/industryisland.svg',
  state: {
    graphic: {},
    style: {
      x: '4%',
      y: '28%'
    }
  },
  props: {
    size: '22%'
  },
  animators: {},
  layer: 5
};

const bridgeCar = {
  name: 'bridgeCar',
  shape: './images/carblue.svg',
  state: {
    graphic: {},
    style: {
      x: '29.16%',
      y: '33.80%'
    }
  },
  props: {
    size: '2.60%'
  },
  animators: {},
  layer: 5
};

let glyphTemplate = {
  name: String,
  shape: String,
  state: {
    graphic: {},
    style: {}
  },
  props: {
    size: String,
    preventEdits: Boolean
  },
  animators: {
    frameChanger: {
      duration: Number,
      frames: [String, String]
    },
    pathMover: {
      duration: Number,
      path: {
        state: {
          graphic: {},
          style: {}
        },
        coords: String
      }
    }
  }
};
