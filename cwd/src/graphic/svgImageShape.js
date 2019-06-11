export const svgImageShape = () => {
  let graphic = {
    type: 'svgImage',
    url: null,
    draggable: true
  };

  return {
    url: function(url) {
      graphic.url = url;

      return this;
    },

    size: function(width, height) {
      graphic.width = width || null;
      graphic.height = height || null;

      return this;
    },

    graphic: function() {
      return graphic;
    },

    preventDrag: function() {
      graphic.draggable = false;

      return this;
    }
  };
};
