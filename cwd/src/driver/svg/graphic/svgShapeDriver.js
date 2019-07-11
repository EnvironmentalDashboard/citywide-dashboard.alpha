export const svgShapeDriver = () => {
  return {
    create: function(state) {
      let $svg = document.createElement('svg');

      return $svg;
    },

    update: async function(state) {
      // Insert svgContent into state.$link
      const svgString = await fetch(state.graphic.url).then(response => response.text());
      const svgElement = new DOMParser().parseFromString(svgString, "image/svg+xml").firstElementChild;
      console.log(svgElement)
      state.$link = state.$link.parentNode.replaceChild(svgElement, state.$link);
      
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

      for (var key in state.style) {
        state.$link.style[key] = state.style[key];
      }
    }
  };
};
