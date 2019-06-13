const zigPath = {
  state: {
    graphic: {},
    style: {}
  },
  composite: [
    {
      name: 'graphic',
      chain: [
        {
          name: 'shape',
          args: {
            type: 'pathShape',
            chain: [
              {
                name: 'coords',
                args: 'M500,250 L400,240 L240,160 L160,40 L80,80 L-100,100'
              }
            ]
          }
        }
      ]
    }
  ]
};

module.exports.zigPath = zigPath;
