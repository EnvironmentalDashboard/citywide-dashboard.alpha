export const svgShapeDriver = () => {
  return {
    create: function(graphic) {
      // Insert svg into state.$link
      let $svg = new DOMParser().parseFromString(graphic.svgContent, "image/svg+xml").firstElementChild;
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
      state.$link.setAttribute('overflow', 'visible');

      if (state.graphic.hasFlow) state.$link.classList.add('flowable');

      if (state.graphic.hoverEffect) {
        switch(state.graphic.hoverEffect) {
          case 'glow':
            state.$link.classList.add('glow-on-hover');
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
