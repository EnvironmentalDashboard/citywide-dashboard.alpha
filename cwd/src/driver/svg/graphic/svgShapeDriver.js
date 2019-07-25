export const svgShapeDriver = () => {
  return {
    create: async function(graphic) {
      // Insert svg into state.$link
      const svgString = await fetch(graphic.url).then(response => response.text());
      const $svg = new DOMParser().parseFromString(svgString, "image/svg+xml").firstElementChild;
      return $svg;
    },

    update: function(state) {

      if (!state.$link) {
        return;
      }

      // Set relevant style attributes
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

      state.$link.setAttribute('preserveAspectRatio', 'xMinYMin');

      if (state.graphic.hoverEffect){
        switch(state.graphic.hoverEffect) {
          case 'glow':
            state.$link.setAttribute('class', 'glow-on-hover');
            break;
          default:
            console.log('Unknown hover effect: ' + state.graphic.hoverEffect)
        }
      }

      for (var key in state.style) {
        if (key === 'x' || key === 'y') {
          state.$link.setAttribute(key, state.style[key]);
        } else {
          state.$link.style[key] = state.style[key];
        }
      }
    }
  };
};
