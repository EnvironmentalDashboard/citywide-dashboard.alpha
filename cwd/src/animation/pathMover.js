import { getCompositeTransform } from './commonFunctions';

export const pathMover = state => {
  let duration = 5000;

  let lastStepped = 0;
  let stepEvery = 1;

  let path = null;
  let group = null;

  return {
    duration: function(dur) {
      duration = dur;

      return this;
    },

    path: function(shape) {
      path = shape;
      state.path = shape;

      return this;
    },

    addGroup: function(groupName) {
      if (groupName) {
        group = groupName;
      }
      console.log(group);
      return this;
    },

    step: function(timestamp) {
      lastStepped = timestamp;
      let current = timestamp % duration;

      if (group) {
        console.log('has a group!');
        let groupLink = null;
        for (let node of state.$link.children) {
          if (node.id === group) {
            groupLink = node;
            groupLink.style.offsetPath = `path("${state.path.graphic.coords}")`;
            // groupLink.style.offsetPath = `path("M140,140 L 0 0")`;
            groupLink.style.offsetDistance = `${(current / duration) * 100}%`;
            groupLink.style.offsetRotate = '0deg';
          }
        }

        // if (groupLink) {
        //   console.log(groupLink.style ? groupLink : 'merp');
        // }
      } else {
      let lengthOnPath =
        (current / duration) * state.path.$link.getTotalLength();

      let linkTransformable = state.$link.tagName.toUpperCase() === 'SVG' ? false : true;

      /**
       * @todo This may be leakly logic...
       */
      let point = state.path.$link.getPointAtLength(lengthOnPath);

      // TODO: Transform by point.x vs. setting x: point.x? Behavior is inconsistent.
      if (linkTransformable) {
        const transform = getCompositeTransform(
          state,
          `translate(${point.x}px, ${point.y}px)`
        );
        state.style = Object.assign(state.style, { transform });
      } else {
        state.style = Object.assign(state.style, { x: point.x, y: point.y });
      }
    }
    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
