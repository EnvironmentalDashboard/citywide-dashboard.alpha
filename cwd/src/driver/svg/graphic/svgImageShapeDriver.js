export const svgImageShapeDriver = () => {
  return {
    create: function(state) {
      let $image = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image'
      );

      return $image;
    },

    update: function(state) {
      state.$link.setAttribute('href', state.graphic.url);

      if (state.graphic.width || state.graphic.height) {
        state.graphic.height
          ? state.$link.setAttribute('height', state.graphic.height)
          : null;
        state.graphic.width
          ? state.$link.setAttribute('width', state.graphic.width)
          : null;
      } else {
        state.$link.setAttribute('width', '400px');
        state.$link.setAttribute('height', '400px');
      }

      for (var key in state.style) {
        state.$link.style[key] = state.style[key];
      }
    }
  };
};
