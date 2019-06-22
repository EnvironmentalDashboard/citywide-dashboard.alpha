export const svgGradient = () => {
  let graphic = {
    type: 'linearGradient',
    id: '',
    stops: []
  };

  return {
    id: function(id) {
      graphic.id = id;

      return this;
    },

    addStop: function(stop) {
      graphic.stops.push(stop);

      return this;
    },

    graphic: function() {
      return graphic;
    },

    readyToStep: function(timestamp) {
      console.log('here', timestamp);
      return true;//timestamp - lastStepped >= stepEvery;
    }
  };
};
