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

    props: function(props) {
      state.graphic.hoverEffect = props.hoverEffect;
      state.id = props.id;

      return this;
    }
  };
};
