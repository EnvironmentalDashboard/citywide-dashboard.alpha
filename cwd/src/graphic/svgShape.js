export const svgShape = () => {
  let graphic = {
    type: 'svg',
    url: null,
    draggable: true,
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

    content: function(svgContent) {
      graphic.svgContent = svgContent;
      return this;
    }
  };
};
