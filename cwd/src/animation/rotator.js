import { getCompositeTransform } from './commonFunctions';

export const rotator = state => {
  let duration = 5000;
  let direction = 'clockwise';

  let lastStepped = 0;
  let stepEvery = 1;

  const directionDictionary = {
    clockwise: 1,
    counterclockwise: -1
  };

  return {
    duration: function(dur) {
      duration = dur;

      return this;
    },

    direction: function(dir) {
      if (dir != 'clockwise' && dir != 'counterclockwise') {
        return this;
      }
      direction = dir;

      return this;
    },

    step: function(timestamp) {
      lastStepped = timestamp;
      const current = timestamp % duration;
      const turnsRotated =
        (current / duration) * directionDictionary[direction];
      const transform = getCompositeTransform(
        state,
        `rotate(${turnsRotated}turn)`
      );

      state.style = Object.assign(state.style, { transform });
    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
