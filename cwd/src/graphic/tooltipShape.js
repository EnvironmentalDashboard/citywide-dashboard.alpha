export const tooltipShape = () => {
  let graphic = {
    type: 'tooltip',
    url: null
  };

  return {
    text: function(text) {
      graphic.text = text;

      return this;
    },

    graphic: function() {
      return graphic;
    }
  };
};
