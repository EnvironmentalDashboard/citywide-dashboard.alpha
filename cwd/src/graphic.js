export const graphic = state => {
  state.graphic = {
    type: null,
    url: null
  };

  return {
    shape: function(shape) {
      state.graphic = shape.graphic();

      return this;
    },

    domEffects: function(props) {
      props.hoverEffect ? state.graphic.hoverEffect = 'true' : state.graphic.hoverEffect = '';

      return this;
    }
  };
};
