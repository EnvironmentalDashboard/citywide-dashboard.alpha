export const pathShape = () => {
  let graphic = {
    type: 'path',
    coords: null
  };

  return {
    coords: function(path) {
      graphic.coords = path;

      return this;
    },
    
    from: function(pathId) {
      graphic.pathId = pathId;

      return this;
    },

    graphic: function() {
      return graphic;
    }
  };
};
