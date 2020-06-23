export const pathShapeDriver = () => {
  return {
    create: function(state) {
      let $image = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      return $image;
    },

    // TODO: Shouldn't need to create a new path that clones one that already exists.
    // pathMover should be able to just reference state's own path. see `app.factory`

    update: function(state) {
      if (state.graphic.pathId) {
        const $refPath = document.getElementById(state.graphic.pathId);
        if ($refPath) {
          state.$link.setAttribute('d', $refPath.getAttribute('d'));
        }
      } else {
        state.$link.setAttribute('d', state.graphic.coords);
      }

      for (var key in state.style) {
        state.$link.style[key] = state.style[key];
      }
    }
  };
};
