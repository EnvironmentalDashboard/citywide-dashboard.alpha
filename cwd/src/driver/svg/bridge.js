import { svgImageShapeDriver } from './graphic/svgImageShapeDriver';
import { pathShapeDriver } from './graphic/pathShapeDriver';
import { svgGradientDriver } from './graphic/svgGradientDriver';

export const bridge = $svg => {
  let graphic = {};

  const elementDictionary = {
    svgImage: svgImageShapeDriver,
    path: pathShapeDriver,
    linearGradient: svgGradientDriver
  };

  let strategyLookup = key => {
    if (elementDictionary.hasOwnProperty(key)) {
      return elementDictionary[key];
    }

    return;
  };

  let register = state => {
    if (state.graphic.type == null) {
      return;
    }

    state.$link = strategyLookup(state.graphic.type)
      .call()
      .create(state.graphic);
    if (state.path) {
      state.path.$link = strategyLookup(state.path.graphic.type)
        .call()
        .create(state.path.graphic);
    }
    // event driver
    if (state.events !== undefined) {
      state.events.forEach(event => {
        state.$link.addEventListener(event.type, event.listener);
      });
    }

    return $svg.appendChild(state.$link);
  };

  let update = state => {
    strategyLookup(state.graphic.type)
      .call()
      .update(state);
    if (state.path) {
      strategyLookup(state.path.graphic.type)
        .call()
        .update(state.path);
    }
  };

  return {
    url: url => {
      graphic.url = url;
    },

    draw: (graphic, style) => {
      console.log('No driver');
    },

    handleRender: state => {
      if (!state.hasOwnProperty('$link')) {
        register(state);
      }

      update(state);
    }
  };
};
